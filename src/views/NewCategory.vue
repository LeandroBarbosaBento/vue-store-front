<template>
<div class="container-newproduct">

    

	<MDBSpinner v-if="loader" />

	<template v-if="!loader">

		<h1>Adicionar nova categoria</h1>

	
		<MDBInput
			type="text"
			label="Nome"
			id="form8Name"
			v-model="form8Name"
			wrapperClass="mb-4"
			invalidFeedback="Please provide your first name"
		/>

		<hr>

		<MDBBtn 
			color="primary" 
			@click="createCategory" 
			class="me-2"
		> 
			Adicionar categoria 
		</MDBBtn>

	</template>

    
</div>
</template>

<script>
import { MDBInput, MDBBtn, MDBSpinner} from "mdb-vue-ui-kit";
import { ref } from 'vue';
import api from '@/utils/api.js'
import { useRouter } from 'vue-router';

export default {
    components: {
        MDBInput,
		MDBBtn,
		MDBSpinner
    },
	setup() {
		const form8Name = ref();
		const loader = ref(false);
		return {
			form8Name,
			loader
		};
    },
	data() {
		return {
			router: useRouter(),
		}
	},
	methods: {
		createCategory(){

			this.loader = true;

			var data = {
				name: this.form8Name,
			}

			api
				.post('api/categories', data)
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