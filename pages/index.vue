<template>
  <div class="bank">
    <div class="container">
      <code class="one-liner">pastebin run GsjegT</code>
      <h1>Welcome to Computercraft Bank</h1>
      <div class="feature-container">
        <div class="feature" v-for="feature in features" :key="feature.id">
          <div class="feature-content">
            <h2>{{ feature.name }}</h2>
            <p>{{ feature.description }}</p>
          </div>
          <NuxtImage class="feature-image" :src="feature.image" :alt="feature.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      features: [
        { id: 1, name: "Secure Transactions", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", image: "~/assets/images/feature1.jpg" },
        { id: 2, name: "24/7 Customer Support", description: "Nullam nec nisi ac nisi congue tristique sed a felis.", image: "~/assets/images/feature2.jpg" },
        { id: 3, name: "Mobile Banking App", description: "Vestibulum id erat sit amet est ullamcorper tristique.", image: "~/assets/images/feature3.jpg" },
      ],
    };
  },
};
</script>

<style>
.bank {
  text-align: center;
  padding: 20px;
}

.feature-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.feature {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 300px;
  margin: 10px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.feature-content {
  margin-right: 20px;
}

h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  margin-bottom: 10px;
}

.code.one-liner {
  display: block;
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.feature-image {
  max-width: 100%;
  height: auto;
}
</style>