function Grad(x, y, z) {
  this.x = x
  this.y = y
  this.z = z
}

Grad.prototype.dot3 = function(x, y, z) {
  return this.x * x + this.y * y + this.z * z
}

var grad3 = [
  new Grad(1, 1, 0),
  new Grad(-1, 1, 0),
  new Grad(1, -1, 0),
  new Grad(-1, -1, 0),
  new Grad(1, 0, 1),
  new Grad(-1, 0, 1),
  new Grad(1, 0, -1),
  new Grad(-1, 0, -1),
  new Grad(0, 1, 1),
  new Grad(0, -1, 1),
  new Grad(0, 1, -1),
  new Grad(0, -1, -1)
]

var p = [
  151,
  160,
  137,
  91,
  90,
  15,
  131,
  13,
  201,
  95,
  96,
  53,
  194,
  233,
  7,
  225,
  140,
  36,
  103,
  30,
  69,
  142,
  8,
  99,
  37,
  240,
  21,
  10,
  23,
  190,
  6,
  148,
  247,
  120,
  234,
  75,
  0,
  26,
  197,
  62,
  94,
  252,
  219,
  203,
  117,
  35,
  11,
  32,
  57,
  177,
  33,
  88,
  237,
  149,
  56,
  87,
  174,
  20,
  125,
  136,
  171,
  168,
  68,
  175,
  74,
  165,
  71,
  134,
  139,
  48,
  27,
  166,
  77,
  146,
  158,
  231,
  83,
  111,
  229,
  122,
  60,
  211,
  133,
  230,
  220,
  105,
  92,
  41,
  55,
  46,
  245,
  40,
  244,
  102,
  143,
  54,
  65,
  25,
  63,
  161,
  1,
  216,
  80,
  73,
  209,
  76,
  132,
  187,
  208,
  89,
  18,
  169,
  200,
  196,
  135,
  130,
  116,
  188,
  159,
  86,
  164,
  100,
  109,
  198,
  173,
  186,
  3,
  64,
  52,
  217,
  226,
  250,
  124,
  123,
  5,
  202,
  38,
  147,
  118,
  126,
  255,
  82,
  85,
  212,
  207,
  206,
  59,
  227,
  47,
  16,
  58,
  17,
  182,
  189,
  28,
  42,
  223,
  183,
  170,
  213,
  119,
  248,
  152,
  2,
  44,
  154,
  163,
  70,
  221,
  153,
  101,
  155,
  167,
  43,
  172,
  9,
  129,
  22,
  39,
  253,
  19,
  98,
  108,
  110,
  79,
  113,
  224,
  232,
  178,
  185,
  112,
  104,
  218,
  246,
  97,
  228,
  251,
  34,
  242,
  193,
  238,
  210,
  144,
  12,
  191,
  179,
  162,
  241,
  81,
  51,
  145,
  235,
  249,
  14,
  239,
  107,
  49,
  192,
  214,
  31,
  181,
  199,
  106,
  157,
  184,
  84,
  204,
  176,
  115,
  121,
  50,
  45,
  127,
  4,
  150,
  254,
  138,
  236,
  205,
  93,
  222,
  114,
  67,
  29,
  24,
  72,
  243,
  141,
  128,
  195,
  78,
  66,
  215,
  61,
  156,
  180
]
// To remove the need for index wrapping, double the permutation table length
var perm = new Array(512)
var gradP = new Array(512)

// This isn't a very good seeding function, but it works ok. It supports 2^16
// different seed values. Write something better if you need more seeds.
var seed = function(seed) {
  if (seed > 0 && seed < 1) {
    // Scale the seed out
    seed *= 65536
  }

  seed = Math.floor(seed)
  if (seed < 256) {
    seed |= seed << 8
  }

  for (var i = 0; i < 256; i++) {
    var v
    if (i & 1) {
      v = p[i] ^ (seed & 255)
    } else {
      v = p[i] ^ ((seed >> 8) & 255)
    }

    perm[i] = perm[i + 256] = v
    gradP[i] = gradP[i + 256] = grad3[v % 12]
  }
}
seed(0)

// ##### Perlin noise stuff
function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10)
}

function lerp(a, b, t) {
  return (1 - t) * a + t * b
}

// 3D Perlin Noise
var perlin3 = function(x, y, z) {
  // Find unit grid cell containing point
  var X = Math.floor(x),
    Y = Math.floor(y),
    Z = Math.floor(z)
  // Get relative xyz coordinates of point within that cell
  x = x - X
  y = y - Y
  z = z - Z
  // Wrap the integer cells at 255 (smaller integer period can be introduced here)
  X = X & 255
  Y = Y & 255
  Z = Z & 255

  // Calculate noise contributions from each of the eight corners
  var n000 = gradP[X + perm[Y + perm[Z]]].dot3(x, y, z)
  var n001 = gradP[X + perm[Y + perm[Z + 1]]].dot3(x, y, z - 1)
  var n010 = gradP[X + perm[Y + 1 + perm[Z]]].dot3(x, y - 1, z)
  var n011 = gradP[X + perm[Y + 1 + perm[Z + 1]]].dot3(x, y - 1, z - 1)
  var n100 = gradP[X + 1 + perm[Y + perm[Z]]].dot3(x - 1, y, z)
  var n101 = gradP[X + 1 + perm[Y + perm[Z + 1]]].dot3(x - 1, y, z - 1)
  var n110 = gradP[X + 1 + perm[Y + 1 + perm[Z]]].dot3(x - 1, y - 1, z)
  var n111 = gradP[X + 1 + perm[Y + 1 + perm[Z + 1]]].dot3(x - 1, y - 1, z - 1)

  // Compute the fade curve value for x, y, z
  var u = fade(x)
  var v = fade(y)
  var w = fade(z)

  // Interpolate
  return lerp(
    lerp(lerp(n000, n100, u), lerp(n001, n101, u), w),
    lerp(lerp(n010, n110, u), lerp(n011, n111, u), w),
    v
  )
}

function debounce(func, wait, immediate) {
  var timeout

  return function executedFunction() {
    var context = this
    var args = arguments

    var later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }

    var callNow = immediate && !timeout

    clearTimeout(timeout)

    timeout = setTimeout(later, wait)

    if (callNow) func.apply(context, args)
  }
}

window.addEventListener('load', function() {
  var header = document.querySelector('header')

  var width = window.innerWidth
  var height = header.offsetHeight - 2
  // Set the scene and camera
  var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('canvas'),
    antialias: true
  })
  renderer.setClearColor(0xf5f5f5)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  var scene = new THREE.Scene()
  var perspective = width / height
  var camera = new THREE.PerspectiveCamera(6, perspective, 0.1, 1000)

  camera.position.z = 3

  // Add a sphere to the scene
  var sphereGeometry = new THREE.SphereGeometry(50, 50, 50)
  var material = new THREE.MeshLambertMaterial({
    color: '#cccccc',
    emissive: '#cccccc',
    wireframe: true
  })
  var sphere = new THREE.Mesh(sphereGeometry, material)
  scene.add(sphere)

  // Animate the sphere
  function animate() {
    sphere.rotation.y -= 0.0002
    sphere.rotation.x -= 0.0001
    var time = performance.now() * 0.0003
    var spikeyness = 6

    for (var i = 0; i < sphere.geometry.vertices.length; i++) {
      var p = sphere.geometry.vertices[i]
      p.normalize().multiplyScalar(
        1 +
          0.175 *
            perlin3(p.x * spikeyness + time, p.y * spikeyness, p.z * spikeyness)
      )
    }

    sphere.geometry.computeVertexNormals()
    sphere.geometry.normalsNeedUpdate = true
    sphere.geometry.verticesNeedUpdate = true

    renderer.render(scene, camera)
    setTimeout(function() {
      requestAnimationFrame(animate)
    }, 1000 / 30)
  }

  requestAnimationFrame(animate)

  window.addEventListener(
    'resize',
    debounce(function() {
      var width = window.innerWidth
      var height = header.offsetHeight - 2
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }, 250)
  )
})