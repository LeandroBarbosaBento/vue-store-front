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
        Erro ao carregar produtos!
    </MDBModalBody>
    <MDBModalFooter>
        <MDBBtn color="secondary" @click="modalShow = false"> Fechar </MDBBtn>
    </MDBModalFooter>
    </MDBModal>


<div class="container-products">
    <div v-for="product in products" :key="product.id">

        <Product
            :product="product"
            :category="categories.find( category => {
                        return category.id == product.categories_id
                    })"
         />

    </div>
</div>

</template>
<style scoped>
.container-products {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
<script>
import { 
    MDBBtn,
    MDBSpinner,
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from "mdb-vue-ui-kit";
import api from '@/utils/api.js';
import { ref } from "vue";
import { useRouter } from 'vue-router';
import Product from '@/components/Product.vue';


  export default {
    components: {
        MDBBtn,
        MDBSpinner,
        MDBModal,
        MDBModalHeader,
        MDBModalTitle,
        MDBModalBody,
        MDBModalFooter,
        Product,
    },
    setup() {

        const products = ref(null);
        const spinnerShow = ref(true);
        const modalShow = ref(false);

        api
            .get('api/products')
            .then((response) => {

                spinnerShow.value = false;

                products.value = response.data;
        
                console.log("products: ");
                console.log(products.value);

            })
            .catch((error) => {

                spinnerShow.value = false;
                modalShow.value = true;

                console.log("erro: ");
                console.log(error);

            });

        return {
            products,
            spinnerShow,
            modalShow
        };
        
    },
    data() {
        return {
            router: useRouter(), 
            categories: JSON.parse(localStorage.getItem('categories')),
        }
    },
    methods: {
        login() {
            console.log('Login');

            api
                .get('api/products')
                .then((response) => {
            
                    console.log("products: ");
                    console.log(response.data);

                })
                .catch((error) => {

                    console.log("erro: ");
                    console.log(error);

                });
        },
        register(){
            console.log('Register');

            api
            .post('api/auth/register', {
                email: this.form7LoginEmail,
                name: this.form7RegisterName,
                password: this.form7LoginPassword,
                type: this.isClient ? '0' : '1'
            })
            .then(() => {
                this.router.push('/login');
            })
            .catch((error) => {

                console.log("erro: ");
                console.log(error);

            });

        },
    }
  };
</script>