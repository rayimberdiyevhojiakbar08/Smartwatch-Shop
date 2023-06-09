const btn = document.querySelectorAll("button[data-id]");
btn.forEach(tag => {
  tag.addEventListener("click", () => {
    let id = tag.getAttribute("data-id");
    $.ajax({
      url: "/add-to-cart",
      method: "POST",
      data: { 
        id,
        quantity: 1
      },
      dataType: "JSON",
      success: function(data) {
        const count_items = document.getElementById("count-items");
        const set = new Set(data.map(item => item.data._id));
        count_items.textContent = set.size;
      }
    });
  });
});
  
  document.getElementById('filterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const color = document.getElementById('color').value;
  const minCost = document.getElementById('minCost').value;
  const maxCost = document.getElementById('maxCost').value;
  const resultContainer = document.getElementById('resultContainer');

  axios.get('/products', {
    params: {
      color: color,
      minCost: minCost,
      maxCost: maxCost
    }
  })
  
    .then(function(response) {
      resultContainer.innerHTML = '';
      const products = response.data;
      function generateProductHTML(product) {
        return `
            <div class="product">
            <a href="/show/${product._id}"><img src="/image/${product.img}" alt="*_*" class="align-middle" style="width: 50px;"></a>
           
            <div class="info">
              <a href="/show/${product._id}"><h6 class="title">${product.title}</h6></a>
                <p class="cost">$${product.buy_cost} ${product.color}</p>
            </div>
            </div>
        `;
        }
      products.forEach(function(product) {
        const productHTML = generateProductHTML(product);
        resultContainer.insertAdjacentHTML('beforeend', productHTML);
      });
    })
    .catch(function(error) {
      console.error('Error fetching data', error);
    });
});