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
      <MDBInput wrapperClass="col-auto" label="Quantidade" type="number" />
      <div class="col-auto">
        <span id="textExample2" class="form-text">unidade: {{ product.unit }} </span>
      </div>
    </div>
    
    <hr>
    <MDBBtn color="primary">Adicionar ao carrinho</MDBBtn>
  </MDBCardBody>
</MDBCard>


</template>

<script>
import { 
  MDBCard, 
  MDBCardBody, 
  MDBCardTitle, 
  MDBCardText,
  /* MDBCardLink, */ 
  MDBInput,
  MDBBtn
} from "mdb-vue-ui-kit";

export default {
  name: "Product",
  components: {
    MDBCard, 
    MDBCardBody, 
    MDBCardTitle, 
    MDBCardText,
    /* MDBCardLink, */
    MDBInput,
    MDBBtn
  },
  props: {
    product: Object,
    category: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
