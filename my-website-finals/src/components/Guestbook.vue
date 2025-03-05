<template>
  <div>
    <h4>Guestbook</h4>
    <div class="content-container">
      <div class="content-form">
        <section id="comments-form">
          <form @submit.prevent="submitEntry">
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" id="name" v-model="newEntry.name" required class="form-control" />
            </div>
            <div class="form-group">
              <label for="message">Comments:</label>
              <textarea id="message" v-model="newEntry.message" required class="form-control"></textarea>
            </div>
            <button type="submit" class="btn">Submit</button>
          </form>
        </section>
      </div>

      <div class="content">
        <section id="comments">
          <div v-for="(entry, index) in entries" :key="index">
            <strong>{{ entry.name }}:</strong><br />
            {{ entry.message }} <br><br>
          </div>
        </section>
      </div>
    </div>

    <div class="menu-container" :class="{ open: menuOpen }">
      <div class="menu-button" @click="toggleMenu" :class="{ active: menuActive }"></div>
      <div class="menu-items">
        <router-link to="/" class="menu-item" data-title="Home">🏠</router-link>
        <router-link to="/edu_exp" class="menu-item" data-title="Education & Experience">🎓</router-link>
        <router-link to="/interest" class="menu-item" data-title="Interests">❤️</router-link>
        <router-link to="/gallery" class="menu-item" data-title="Gallery">🖼️</router-link>
        <router-link to="/guestbook" class="menu-item" data-title="Guestbook">📝</router-link>
      </div>
    </div>

    <div id="successModal" class="modal" :style="{ display: showModal ? 'block' : 'none' }">
      <div class="modal-content">
        <p>Message successfully submitted!</p>
        <button @click="closeModal" class="btn">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { supabase } from '../lib/supabaseClient';

export default {
  data() {
    return {
      newEntry: { name: '', message: '' },
      entries: [],
      menuOpen: false,
      menuActive: false,
      showModal: false,
    };
  },
  async mounted() {
    await this.fetchEntries();
  },
  methods: {
    async fetchEntries() {
      const { data, error } = await supabase.from('guestbook').select('*');
      if (error) {
        console.error(error);
      } else {
        this.entries = data;
      }
    },
    async submitEntry() {
      const { error } = await supabase.from('guestbook').insert([this.newEntry]);
      if (error) {
        console.error(error);
      } else {
        this.newEntry = { name: '', message: '' };
        await this.fetchEntries();
        this.showModal = true;
        setTimeout(() => {
          this.closeModal();
        }, 3000);
      }
    },
    closeModal() {
      this.showModal = false;
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      this.menuActive = !this.menuActive;
    },
  },
};
</script>




<style scoped>
.content-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 90%;
  max-width: 1200px;
  margin-top: 20px;
}

.content {
  background: rgba(0, 0, 0, 0.5);
  padding: 30px;
  border-radius: 10px;
  max-width: 1200vw;
  width: 100%;
  margin: 20px;
  overflow-y: auto;
  box-sizing: border-box;
}

.content-form {
  background: rgba(0, 0, 0, 0.5);
  padding: 30px;
  border-radius: 10px;
  max-width: 80vw;
  width: 60%;
  margin: 20px;
  overflow-y: auto;
  box-sizing: border-box;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
  margin-top: 25px;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px 0 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

textarea {
  width: 100%;
  height: 300%;
  padding: 10px;
  margin-top: 5px 0 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
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
  background: url("/images/Home3.png") center/cover no-repeat;
  min-height: 100vh;
  color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-attachment: fixed;
  background-color: black; /* Fallback background color */
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
  text-align: left;
  font-size: 20px;
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

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
}

button {
  width: 50%;
  background: #2e295f;
  color: white;
  padding: 10px;
  border: none;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 5px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

button:hover {
  background: #393380;
}
</style>