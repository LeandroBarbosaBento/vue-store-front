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

<div class="row header-cart">

    <MDBBtnGroup class="shadow-0">
        <MDBBtn size="lg" outline="success" @click="FinishOrder">Realizar compra</MDBBtn>
    </MDBBtnGroup>
    <div>
        <h1> Total: {{store.getters.getTotal}} reais</h1> 
    </div>

    <MDBInput
        type="text"
        label="Título do pedido - opcional"
        id="form7RegisterName"
        v-model="title"
        wrapperClass="mb-4"
    />

    <MDBInput
        type="text"
        label="Comentários - opcional"
        id="form7RegisterName"
        v-model="comment"
        wrapperClass="mb-4"
    />


</div>

  <MDBTable align="middle">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Produto</th>
        <th scope="col">Quantidade</th>
        <th scope="col">Valor Unidade</th>
        <th scope="col">Valor Total</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item, index in store.getters.getProducts" :key="item">
        <th scope="row">{{index}}</th>
        <td>{{item.product.name}}</td>
        <td>{{item.amount}}</td>
        <td>{{item.product.price}}</td>
        <td>{{item.price}}</td>
        <td>
          <MDBBtn @click="removeItem(index)" color="link" size="sm" class="px-3" :ripple="{ color: 'dark' }">
            <MDBIcon icon="times" />
          </MDBBtn>
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
    MDBBtnGroup,
    MDBIcon,
    MDBInput,
    MDBTable,
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBSpinner
} from "mdb-vue-ui-kit";
import { ref } from "vue";
import store from "@/store/store.js";
import api from "@/utils/api.js";
import { useRouter } from 'vue-router';



export default {
    name: "Product",
    components: {
        MDBBtn,
        MDBBtnGroup,
        MDBIcon,
        MDBInput,
        MDBTable,
        MDBModal,
        MDBModalHeader,
        MDBModalTitle,
        MDBModalBody,
        MDBModalFooter,
        MDBSpinner
    },
    props: {
        product: Object,
        category: Object,
    },
    data(){
        return {
            store: store,
            router: useRouter(), 
        }
    },
    setup(){
        const amount = ref(0);
        const comment = ref("");
        const title = ref("");
        const spinnerShow = ref(false);
        const modalShow = ref(false);
        const modalMessage = ref("");
        return {
            amount,
            comment,
            title,
            spinnerShow,
            modalShow,
            modalMessage
        }
    }, 
    methods: {
        teste() {
            console.log("Itens do carrinho:");
            console.log(this.store.getters.getProducts)
        },
        removeItem(index) {
            console.log("remover item", index);

            store.commit("removeItem", index);
        },
        FinishOrder() {
            console.log("finish order");

            var products = this.store.getters.getProducts.map( element => {
                return {
                    'product_id': element.product.id,
                    'amount': element.amount,
                    
                };
            });

            var data = {
                'name': this.name,
                'total': store.getters.getTotal,
                'comments': this.comment ? "" : this.comment,
                'orderProducts': products,
            }

            console.log("enviar para api: ")
            console.log(data);

            this.spinnerShow = true;

            api
                .post('api/orders', data)
                .then((response) => {
                    console.log("login: ");
                    console.log(response.data);
                    
                    this.router.push('/orders');

                })
                .catch((error) => {

                this.spinnerShow = false;

                    this.modalShow = true;
                    this.modalMessage = error.response.data.message;

                    console.log("erro: ");
                    console.log(error);

                });
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
