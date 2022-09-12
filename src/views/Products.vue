<template>


    <div v-for="product in products" :key="product.id">
        <MDBCard style="width: 18rem; margin: 10px;">
            <MDBCardBody>
            <MDBCardTitle>{{product.name}}</MDBCardTitle>
            <MDBCardTitle subtitle class="mb-2 text-muted">Categoria</MDBCardTitle>
            <MDBCardText>
                Preço: {{product.price}}
            </MDBCardText>
            <MDBCardLink href="#">Card link</MDBCardLink>
            <MDBCardLink href="#">Another link</MDBCardLink>
            </MDBCardBody>
        </MDBCard>
    </div>

</template>

<script>
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardLink } from "mdb-vue-ui-kit";
import api from '@/utils/api.js';
import { ref } from "vue";
import { useRouter } from 'vue-router';


  export default {
    components: {
        MDBCard,
        MDBCardBody,
        MDBCardTitle,
        MDBCardText,
        MDBCardLink,

    },
    setup() {

        const products = ref(null);

        api
            .get('api/products')
            .then((response) => {

                products.value = response.data;
        
                console.log("products: ");
                console.log(products.value);

            })
            .catch((error) => {

                console.log("erro: ");
                console.log(error);

            });

        return {products};
        
    },
    data() {
        return {
            router: useRouter(), 
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