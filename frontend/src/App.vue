<template>
  <div id="app">
    <h1>Vue.js Button Grid</h1>
    <div class="button-grid">
      <button 
        v-for="(button, index) in buttons" 
        :key="index"
        @click="handleClick(index)"
        class="grid-button"
      >
        {{ button }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      buttons: ['Button 1', 'Button 2', 'Button 3', 'Button 4', 'Button 5', 'Button 6', 'Button 7', 'Button 8', 'Button 9']
    }
  },
  methods: {
    handleClick(index) {
      alert(`Button ${index + 1} clicked!`)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 600px;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 40px;
}

.grid-button {
  padding: 30px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.grid-button:hover {
  background-color: #369970;
  transform: translateY(-2px);
}

.grid-button:active {
  transform: translateY(0);
}
</style>