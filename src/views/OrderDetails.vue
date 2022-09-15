<template>

<MDBSpinner v-if="spinnerShow" />

<MDBModal
    id="exampleModal"
    tabindex="-1"
    labelledby="exampleModalLabel"
    v-model="modalShow"
>
    <MDBModalHeader>
        <MDBModalTitle id="exampleModalLabel"> Erro </MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>
        {{ modalMessage }}
    </MDBModalBody>
    <MDBModalFooter>
        <MDBBtn color="secondary" @click="modalShow = false"> Fechar </MDBBtn>
    </MDBModalFooter>
</MDBModal>

<div class="container-order">
    <div class="row header-order-details">
        <h1>Nome: {{details.order.name ? "": details.order.name}}</h1>
        <h1>Total: {{details.order.total}} </h1>
        <h2>Comentários: {{details.order.comments}}</h2>

    </div>

  <MDBTable align="middle">
    <thead>
      <tr>
        <th>#ID</th>
        <th>Nome</th>
        <th>Quantidade</th>
        <th>Valor Unitário</th>
        <th>Valor Total</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in details.products" :key="product.id">
        <th scope="row">{{product.id}}</th>
        <td>{{product.name}}</td>
        <td>{{product.amount}}</td>
        <td>{{product.price}}</td>
        <td>{{product.total}}</td>
      </tr>
    </tbody>
  </MDBTable>
</div>

</template>
<style scoped>
.header-order-details {
    gap: 20px;
    margin-bottom: 10px;
}
.container-order {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    width: 80%;
}
</style>
<script>
import { 
    MDBBtn,
    MDBTable,
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBSpinner
} from "mdb-vue-ui-kit";
import { ref } from "vue";
import api from "@/utils/api.js";
import { useRouter } from 'vue-router';


export default {
    name: "OrderDetails",
    components: {
        MDBBtn,
        MDBTable,
        MDBModal,
        MDBModalHeader,
        MDBModalTitle,
        MDBModalBody,
        MDBModalFooter,
        MDBSpinner
    },
    setup(){
        const spinnerShow = ref(false);
        const modalShow = ref(false);
        const modalMessage = ref("");
        const details = ref([]);
        const router = ref(useRouter());

        console.log("router");
        console.log(router.value.currentRoute.params.id);

        api
            .get('api/orders/' + router.value.currentRoute.params.id)
            .then((response) => {
                
 
                spinnerShow.value = false;
                details.value = response.data.data

                console.log("data: ");
                console.log(details.value);
                

            })
            .catch((error) => {

                spinnerShow.value = false;

                modalShow.value = true;
                modalMessage.value = error.response.data.message;

                console.log("erro: ");
                console.log(error);

            });

        return {
            spinnerShow,
            modalShow,
            modalMessage
        }
    }, 
    data () {
        return {
            details: [],
            router: useRouter(), 
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
