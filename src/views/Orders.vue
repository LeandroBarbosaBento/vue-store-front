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


<div class="container-cart">
    <!-- <MDBCol>
    <button @click="teste">Ver itens no console</button>
    </MDBCol> -->


  <MDBTable align="middle">
    <thead>
      <tr>
        <th scope="col">#ID</th>
        <th scope="col">Nome</th>
        <th scope="col">Status</th>
        <th scope="col">Data</th>
        <th scope="col">Valor Total</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders" :key="order.id">
        <th scope="row">{{order.id}}</th>
        <td>{{order.nome}}</td>
        <td>{{order.status ? "Aprovado" : "Recusado"}}</td>
        <td>{{order.created_at.split("T")[0]}}</td>
        <td>{{order.total}}</td>
        <td>
            <MDBBtn outline="primary" @click="showOrderDetails"> Ver detalhes da compra </MDBBtn>
        </td>
      </tr>
    </tbody>
  </MDBTable>


  

</div>

</template>
<style scoped>
.container-cart {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    width: 80%;
}
.header-cart {
    gap: 20px;
    margin-bottom: 10px;
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



export default {
    name: "Product",
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

        return {
            spinnerShow,
            modalShow,
            modalMessage
        }
    }, 
    data () {
        return {
            orders: [],
        }
    },
    beforeCreate(){
        this.spinnerShow = true;

            api
                .get('api/orders',)
                .then((response) => {
                    console.log("data: ");
                    console.log(response.data);

                    this.spinnerShow = false;
                    this.orders = response.data
                    

                })
                .catch((error) => {

                    this.spinnerShow = false;

                    this.modalShow = true;
                    this.modalMessage = error.response.data.message;

                    console.log("erro: ");
                    console.log(error);

                });
    },
    methods: {
        showOrderDetails() {
            console.log("ver detalhes");
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
