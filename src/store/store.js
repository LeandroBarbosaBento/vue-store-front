import { createStore } from 'vuex';

export default createStore({
    state: {
      carrinho: [],
      total: 0
    },
    mutations: {
      changeCarrinho(state, product) {
        var isInCart = null;

        console.log("change carrinho");
        console.log(state);

        isInCart = this.state.carrinho.find(
          element => element.product.id === product.product.id
        );

        console.log("is in cart: ", isInCart);

        if(isInCart) {
          console.log("está no carrinho");
          state.carrinho.splice(product.product.id,1);
        }

        this.state.carrinho.push(product);

        this.state.total = 0;
        this.state.carrinho.forEach(element => {
          this.state.total = this.state.total + element.price
        });

      },
      removeItem(state, index){
        console.log("removeu, ", index);
        state.carrinho.splice(index,1)
      }
    },
    getters: {
      getProducts(state){
        return state.carrinho;
      },
      getTotal(state){
        return state.total;
      }
    }
  });


