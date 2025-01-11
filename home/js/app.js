const tabs = document.querySelectorAll('.tab');
    const sections = document.querySelectorAll('section');
    const header = document.getElementById('header');

    let lastScrollY = window.scrollY;

    function activateTab(sectionId) {
      tabs.forEach(tab => {
        if (tab.dataset.section === sectionId) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });
    }

    window.addEventListener('scroll', () => {
      let currentSection = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          currentSection = section.id;
        }
      });

      activateTab(currentSection);

      if (window.scrollY > lastScrollY) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }

      lastScrollY = window.scrollY;
    });

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const section = document.getElementById(tab.dataset.section);
        section.scrollIntoView({ behavior: 'smooth' });
        activateTab(tab.dataset.section);
      });
    });

new Vue({
  el: '#app',
  components: {
    'gallery': {
      template: `
        <div class="gallery">
          <div class="gallery-item" v-for="n in 6" :key="n">
            <img :src="'https://via.placeholder.com/150?text=Image+' + n" alt="Gallery Image">
          </div>
        </div>
      `,
    },
    'guestbook': {
      data() {
        return {
          name: '',
          message: '',
          comments: [],
        };
      },
      template: `
        <div>
          <form @submit.prevent="submitComment">
            <label for="name">Name:</label>
            <input v-model="name" id="name" type="text" required>

            <label for="message">Message:</label>
            <textarea v-model="message" id="message" required></textarea>

            <button type="submit">Submit</button>
          </form>

          <div v-if="comments.length">
            <h3>Comments:</h3>
            <ul>
              <li v-for="comment in comments" :key="comment.name">
                <strong>{{ comment.name }}:</strong> {{ comment.message }}
              </li>
            </ul>
          </div>
        </div>
      `,
      methods: {
        submitComment() {
          if (this.name && this.message) {
            this.comments.push({
              name: this.name,
              message: this.message,
            });
            this.name = '';
            this.message = '';
          }
        },
      },
    },
  },
});
