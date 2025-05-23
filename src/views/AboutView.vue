<template>
  <div class="about-wrapper">
    <Card title="About AMP MERCH STORE" style="margin: 15px">
      <section>
        <p>
          Welcome to <strong>AMP MERCH STORE</strong> — your ultimate destination for exclusive, high-quality apparel,
          stylish accessories, and unique custom merchandise. Whether you're a dedicated fan, a content creator, or
          someone who loves to stand out with personalized gear, we've got something special for you.
        </p><br>

        <p>
          At AMP, we believe in building a vibrant and inclusive community. That's why we empower creators and
          influencers to showcase their brand through custom merchandise collections. From limited-edition drops to
          fan-favorite essentials, every piece is crafted with passion and purpose.
        </p><br>

        <p>
          Manage your users below to keep your store community engaged and growing strong. Connect with your audience,
          track purchases, and deliver a top-tier shopping experience all in one place.
        </p><br>

        <h2>Our Brands</h2>
        <p>
          We proudly feature a curated selection of iconic fashion and streetwear brands, including Adidas, BAPE, Bench,
          Calvin Klein, Carhartt, H&M, Levi's, Nike, OXGN, Stussy, Supreme, and The North Face. Whether you're into
          timeless classics or bold streetwear statements, AMP MERCH STORE brings these top-tier names together for a
          shopping experience you won’t want to miss.
        </p>
      </section>

      <div class="img">
        <img src="/images/Adidas.jpg">
        <img src="/images/BAPE.jpg">
        <img src="/images/Bench.jpg">
        <img src="/images/Calvin Klein.jpg">
        <img src="/images/Carhartt.jpg">
        <img src="/images/H and M.jpg">
        <img src="/images/Levis.jpg">
        <img src="/images/Nike.jpg">
        <img src="/images/OXGN.jpg">
        <img src="/images/Stussy.jpg">
        <img src="/images/Supreme.jpg">
        <img src="/images/The North Face.jpg">
      </div>
    </Card>
  </div>
</template>

<style scoped>
.about-wrapper {
  max-width: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
  gap: 24px;
  background-color: Black;
  background-image: url('/images/Siege.jpg');
  background-size: cover;
  /* Ensures the image covers the entire container */
  background-position: center;
  /* Keeps the image centered */
  /* background-repeat: no-repeat; */
  text-align: center;
  /* ← Light gray-blue background */
  padding: 0px;
  /* Optional: add padding to separate content from edges */
  border-radius: 8px;
  /* Optional: rounded corners */
}


.transaction-form {
  padding: 20px;
}

.row-disabled {
  background-color: Black;
  color: Black;
  pointer-events: none;
}

.img {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* Center the images */
  gap: 20px;
  /* Add spacing between images */
  padding: 20px;
  /* Add some padding around the image grid */
}

img {
  height: 70px;
  width: 70px;
  object-fit: cover;
  border: 3px solid Black;
  border-radius: 10px;
}
</style>