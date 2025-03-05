<template>
  <div :class="{ 'section2-triggered': isSection2Triggered }">
    <div class="background background1"></div>
    <div class="background background2"></div>

    <div class="section section1">
      <div class="center-image">
        <img src="/images/port_pic.png" alt="Your Image Here" />
      </div>
    </div>

    <div class="section section2">
      <div class="content">
        <section id="about">
          <h2>About Me</h2>
          <p>
            Hello! My username is MarielleKloie, this is my personal profile web
            page.<br /><br />I aspire to be an Information Technology Specialist, a
            position that can hone me into the best employee I can be, versatile
            and efficient enough to be showcased in the industry today. Being in
            a working environment will encourage me to be confident and true to
            myself.
          </p>
        </section>
      </div>

      <div class="menu-container" :class="{ open: isMenuOpen }">
        <div class="menu-button" @click="toggleMenu"></div>
        <div class="menu-items">
        <router-link to="/" class="menu-item" data-title="Home">🏠</router-link>
        <router-link to="/edu_exp" class="menu-item" data-title="Education & Experience">🎓</router-link>
        <router-link to="/interest" class="menu-item" data-title="Interests">❤️</router-link>
        <router-link to="/gallery" class="menu-item" data-title="Gallery">🖼️</router-link>
        <router-link to="/guestbook" class="menu-item" data-title="Comment">📝</router-link>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      isSection2Triggered: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    handleScroll() {
      const section1 = document.querySelector(".section1");
      const section2 = document.querySelector(".section2");

      const section1Bottom = section1.getBoundingClientRect().bottom;

      if (section1Bottom < window.innerHeight / 2) {
        this.isSection2Triggered = true;
      } else {
        this.isSection2Triggered = false;
      }
    },
  },
  provide() {
    return {
      isSection2Triggered: this.isSection2Triggered,
    };
  },
};
</script>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
  transition: opacity 0.7s ease-in-out;
}

.background1 {
  background-image: url("/images/Home1.png");
  opacity: 1;
}

.background2 {
  background-image: url("/images/Home2.png");
  opacity: 0;
}

.section2-triggered .background1 {
  opacity: 0;
}

.section2-triggered .background2 {
  opacity: 1;
}

.section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: Arial, sans-serif;
  color: white;
  position: relative;
  z-index: 1;
  width: 100%;
}

.section2 {
  position: relative;
  text-align: center;
  padding-bottom: 60px;
}

.content {
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  width: 90%;
  margin-top: 90px;
  margin-left: 25%;
  margin-right: 30%;
  overflow-y: auto;
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

.center-image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.center-image img {
  max-width: 100vw;
  max-height: 100vh;
  width: auto;
  height: auto;
  display: block;
}
</style>

<style>
body {
  margin: 0;
  font-family: "Baskerville", serif;
  min-height: 100vh;
  color: white;
  position: relative;
  background-color: black;
}

section h2,
section h3,
section h4,
section p,
section li,
section .paragraph {
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
  padding: 15px;
  margin: 10px 0 0 10px;
  text-align: center;
  font-size: 20px;
  color: #4a2a80;
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