<template>

<MDBCard style="width: 18rem; margin: 10px;">
  <MDBCardBody>
    <MDBCardTitle>{{product.name}}</MDBCardTitle>
    <MDBCardTitle subtitle class="mb-2 text-muted">
        {{
            category.name
        }}
    </MDBCardTitle>
    <MDBCardText>
        Preço: {{product.price}}
    </MDBCardText>

    <div class="row g-3 align-items-center">
      <MDBInput 
        v-model="amount"
        wrapperClass="col-auto" 
        label="Quantidade" 
        type="number" 
      />
      <div class="col-auto">
        <span id="textExample2" class="form-text">unidade: {{ product.unit }} </span>
      </div>
    </div>
    
    <hr>
    <MDBBtn color="primary" @click="adicionarItem">Adicionar ao carrinho</MDBBtn>
  </MDBCardBody>
</MDBCard>


</template>

<script>
import { 
  MDBCard, 
  MDBCardBody, 
  MDBCardTitle, 
  MDBCardText,
  MDBInput,
  MDBBtn
} from "mdb-vue-ui-kit";
import { ref } from "vue";
import store from "@/store/store.js";

export default {
  name: "Product",
  components: {
    MDBCard, 
    MDBCardBody, 
    MDBCardTitle, 
    MDBCardText,
    MDBInput,
    MDBBtn
  },
  props: {
    product: Object,
    category: Object,
  },
   setup(){
    const amount = ref(0);
    return {
      amount,
    }
  }, 
  methods: {
    adicionarItem(){
      console.log("Adicionar item");
      console.log(this.product.name)

      store.commit("changeCarrinho", {
        product: this.product,
        amount: this.amount,
        price: this.amount * this.product.price,
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
