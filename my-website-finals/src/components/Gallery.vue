<template>
  <div>
    <div class="content">
      <h4>Gallery</h4>
      <div class="gallery-container">
        <img
          v-for="(image, index) in images"
          :key="index"
          :src="image"
          alt="Gallery Image"
          class="gallery-image"
          @click="enlargeImage(image)"
        />
      </div>
    </div>

    <div class="menu-container" :class="{ open: isMenuOpen }">
      <div class="menu-button" @click="toggleMenu"></div>
      <div class="menu-items">
          <router-link to="/" class="menu-item" data-title="Home">🏠</router-link>
          <router-link to="/edu_exp" class="menu-item" data-title="Education & Experience">🎓</router-link>
          <router-link to="/interest" class="menu-item" data-title="Interests">❤️</router-link>
          <router-link to="/gallery" class="menu-item" data-title="Gallery">🖼️</router-link>
          <router-link to="/guestbook" class="menu-item" data-title="Guestbook">📝</router-link>
        </div>
    </div>
    <div class="overlay" :class="{ active: showOverlay }" @click="closeEnlarged">
      <img v-if="enlargedImage" :src="enlargedImage" class="gallery-image enlarged" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        '/images/gallery/Image (1).jpg',
        '/images/gallery/Image (2).jpg',
        '/images/gallery/Image (3).jpg',
        '/images/gallery/Image (4).jpg',
        '/images/gallery/Image (5).jpg',
        '/images/gallery/Image (6).jpg',
        '/images/gallery/Image (7).jpg',
        '/images/gallery/Image (8).jpg',
        '/images/gallery/Image (9).jpg',
        '/images/gallery/Image (10).jpg',
        '/images/gallery/Image (11).jpg',
        '/images/gallery/Image (12).jpg',
        '/images/gallery/Image (13).jpg',
        '/images/gallery/Image (14).jpg',
        '/images/gallery/Image (15).jpg',
        '/images/gallery/Image (16).jpg',
        '/images/gallery/Image (17).jpg',
        '/images/gallery/Image (18).jpg',
      ],
      isMenuOpen: false,
      enlargedImage: null,
      showOverlay: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    enlargeImage(imageSrc) {
      this.enlargedImage = imageSrc;
      this.showOverlay = true;
    },
    closeEnlarged() {
      this.enlargedImage = null;
      this.showOverlay = false;
    },
  },
};
</script>


<style scoped>
/* Image Styles */
.gallery-image {
width: 100%;
height: auto;
border-radius: 10px;
margin: 0; /* Remove any margin */
padding: 0;
cursor: pointer;
transition: transform 0.3s ease;
margin: 5px;
border: 2px solid transparent;
object-fit: contain;
max-width: 200px;
max-height: 200px;
}

.gallery-image:hover {
border-color: #cfc6e1;
}

.gallery-image.enlarged {
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 1000;
max-width: 90vw;
max-height: 90vh;
width: auto;
height: auto;
}

/* Modal Overlay (Optional, for background dimming when enlarged) */
.overlay {
display: none;
position: fixed;
top: 0;
left: 0;
width: 300%;
height: 300%;
background-color: rgba(0, 0, 0, 0.7);
z-index: 999;
cursor: pointer;
}

.overlay.active {
display: block;
}

/* Gallery Container */
.gallery-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 columns for 4 images per row */
  gap: 5px;
  margin-top: 20px;
  width: 80%; /* Adjust as needed to fit 4 images */
  margin: 20px auto; /* center the gallery container */
}

.menu-container {
position: fixed;
top: 50px;
right: 20px;
z-index: 20;
transform: translateX(-50%);
}

.menu-button {
width: 50px;
height: 50px;
background-color: #17153b;
color: white;
font-size: 30px;
text-align: center;
line-height: 50px;
border-radius: 50%;
cursor: pointer;
transition: 0.3s;
}

.menu-button::before {
content: "\2729";
color: white;
}

.menu-button.active {
transform: rotate(45deg);
}

.menu-items {
position: absolute;
top: 70px;
left: 0;
display: flex;
flex-direction: column;
gap: 15px;
opacity: 0;
transform: translateY(10px);
pointer-events: none;
transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.menu-container.open .menu-items {
opacity: 1;
transform: translateY(0);
pointer-events: auto;
}

.menu-item {
width: 50px;
height: 50px;
background-color: #17153b;
color: white;
font-size: 20px;
text-align: center;
line-height: 50px;
border-radius: 50%;
text-decoration: none;
display: flex;
justify-content: center;
align-items: center;
transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
}

.menu-item::before {
  content: attr(data-title);
  position: absolute;
  height: 30px;
  width: auto;
  top: 20%;
  right: 110%;
  transform: translateX(-5%);
  background-color: #2e295f;
  color: white;
  border-radius: 5px;
  font-size: 15px;
  font-family: "Baskerville", serif;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  display: flex;
  align-items: center; /* Vertical alignment */
  justify-content: center; /* Horizontal alignment */
  padding: 0 10px;
}

.menu-item:hover::before {
  opacity: 1;
  visibility: visible;
}

.menu-item:hover {
background-color: #2e295f;
transform: scale(1.1);
}
</style>


<style>
body {
  margin: 0;
  font-family: "Baskerville", serif;
  background: url('/images/Home3.png') center/cover no-repeat;
  min-height: 100vh;
  color: white;
  position: relative;
  background-attachment: fixed;
}

.content {
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  max-width: 1400px; /* Increased max-width */
  width: 95%; /* Increased width */
  margin: 20px auto;
  overflow-y: auto;
  align-self: center;
}

section h2,
h3,
h4,
p,
li,
.paragraph {
  font-family: "Baskerville", serif;
  color: white;
}

section h2 {
  font-size: 20px;
  text-align: left;
}

h1 {
  border-radius: 2px;
  text-align: center;
  padding: 20px;
  margin: 30px 0 40px;
}

h2 {
  border-radius: 2px;
  padding: 10px;
  margin: 10px 0 0 10px;
  text-align: left;
  font-size: 30px;
}

h3 {
  padding: 5px;
  margin: 10px 0 0;
  text-align: left;
  font-size: 18px;
}

h4 {
  border-radius: 2px;
  padding: 30px;
  margin: 10px 0 0 10px;
  text-align: center;
  font-size: 30px;
}

p,
.paragraph {
  font-size: 15px;
  text-align: justify;
  margin: 30px;
  line-height: 1.5;
}

.paragraph {
  text-align: left;
  margin: 4px 15px 12px;
}

ul {
  list-style-type: square;
}

li {
  margin-top: 10px;
  font-size: 15px;
  text-align: left;
}
</style>