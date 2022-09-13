<template>
<div class="container-newproduct">

    

	<MDBSpinner v-if="loader" />

	<template v-if="!loader">

		<h1>Adicionar novo produto</h1>

	
		<MDBInput
			type="text"
			label="Nome"
			id="form8Name"
			v-model="form8Name"
			wrapperClass="mb-4"
			invalidFeedback="Please provide your first name"
		/>

		<MDBInput
			type="number"
			label="Preço"
			id="form8Price"
			v-model="form8Price"
			wrapperClass="mb-4"
			invalidFeedback="Please provide your first name"
		/>

		<MDBInput
			type="text"
			label="Unidade (kg, metros, litros, ...)"
			id="form8Unit"
			v-model="form8Unit"
			wrapperClass="mb-4"
			invalidFeedback="Please provide your first name"
		/>

		<MDBRadio
			v-for="category in categories"
			:key="category.id"
			:label="category.name"
			name="categories"
			v-model="form8Category"
			:value="category.id"
		/>

		<hr>

		<MDBBtn 
			color="primary" 
			@click="createProduct" 
			class="me-2"
		> 
			Adicionar produto 
		</MDBBtn>

	</template>

    
</div>
</template>

<script>
import { MDBInput, MDBRadio, MDBBtn, MDBSpinner} from "mdb-vue-ui-kit";
import { ref } from 'vue';
import api from '@/utils/api.js'
import { useRouter } from 'vue-router';

export default {
    components: {
        MDBInput,
		MDBRadio,
		MDBBtn,
		MDBSpinner
    },
	setup() {
		const form8Category = ref("1");
		const form8Name = ref();
		const form8Price = ref();
		const form8Unit = ref();
		const categories = ref(null);
		const loader = ref(false);

		api
            .get('api/categories')
            .then((response) => {

				console.log("categories");
				console.log(response.data);

				categories.value = response.data;

            })
            .catch((error) => {

                console.log("erro: ");
                console.log(error);

            });

		return {
			form8Category,
			form8Name,
			form8Unit,
			form8Price,
			categories,
			loader
		};
    },
	data() {
		return {
			router: useRouter(),
		}
	},
	methods: {
		createProduct(){

			this.loader = true;

			var data = {
				name: this.form8Name,
				price: this.form8Price,
				unit: this.form8Unit,
				categories_id: this.form8Category,
			}

			api
				.post('api/products', data)
				.then((response) => {
					console.log("criou");
					console.log(response.data);

					this.loader = false;
					this.router.push('/products');

				})
				.catch((error) => {
					this.loader = false;
					console.log("erro: ");
					console.log(error);

				});

		} 
	}
}
</script>


<style scoped>

.container-newproduct{
    display: flex;
    flex-direction: column;
    margin-top: -200px;
}

</style>