<template>
  <div>
    <MDBTabs v-model="form7ActiveTab">
      <!-- Tabs navs -->
      <MDBTabNav pills justify tabsClasses="mb-3">
        <MDBTabItem tabId="form7-login" href="form7-login"
          >Login</MDBTabItem
        >
        <MDBTabItem tabId="form7-register" href="form7-register"
          >Registrar</MDBTabItem
        >
      </MDBTabNav>
      <!-- Tabs navs -->
      <!-- Tabs content -->
      <MDBTabContent>
        <MDBTabPane tabId="form7-login">
          <form>
            <!-- Email input -->
            <MDBInput
              type="email"
              label="Email address"
              id="form7LoginEmail"
              v-model="form7LoginEmail"
              wrapperClass="mb-4"
            />

            <!-- Password input -->
            <MDBInput
              type="password"
              label="Password"
              id="form7LoginPassword"
              v-model="form7LoginPassword"
              wrapperClass="mb-4"
            />

            <!-- Submit button -->
            <MDBBtn color="primary" block class="mb-4" @click="login">
                Login 
            </MDBBtn>

          </form>
        </MDBTabPane>
        <MDBTabPane tabId="form7-register">
          <form>
            <!-- Name input -->
            <MDBInput
              type="text"
              label="Name"
              id="form7RegisterName"
              v-model="form7RegisterName"
              wrapperClass="mb-4"
            />

            <!-- Email input -->
            <MDBInput
              type="email"
              label="Email"
              id="form7RegisterEmail"
              v-model="form7RegisterEmail"
              wrapperClass="mb-4"
            />

            <!-- Password input -->
            <MDBInput
              type="password"
              label="Password"
              id="form7RegisterPassword"
              v-model="form7RegisterPassword"
              wrapperClass="mb-4"
            />

            <!-- Checkbox -->
            <MDBCheckbox
              label="Deixe marcado para registrar como Cliente. Desmarcado para registrar como Fornecedor"
              id="isClient"
              v-model="isClient"
              wrapperClass="d-flex justify-content-center mb-4"
            />

            <!-- Submit button -->
            <MDBBtn color="primary" block class="mb-3" @click="register">
              Registrar
            </MDBBtn>
          </form>
        </MDBTabPane>
      </MDBTabContent>
      <!-- Tabs content -->
    </MDBTabs>
  </div>
</template>

<script>
import {
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBTabs,
    MDBTabNav,
    MDBTabContent,
    MDBTabItem,
    MDBTabPane,
} from "mdb-vue-ui-kit";
import { ref } from "vue";
import api from '@/utils/api.js';
import { useRouter } from 'vue-router';


  export default {
    components: {
      MDBInput,
      MDBCheckbox,
      MDBBtn,
      MDBTabs,
      MDBTabNav,
      MDBTabContent,
      MDBTabItem,
      MDBTabPane,
    },
    setup() {
      const form7ActiveTab = ref("form7-login");
      const form7LoginEmail = ref("");
      const form7LoginPassword = ref("");
      const form7LoginCheck = ref(true);
      const form7RegisterName = ref("");
      const form7RegisterUsername = ref("");
      const form7RegisterEmail = ref("");
      const form7RegisterPassword = ref("");
      const form7RegisterPasswordRepeat = ref("");
      const isClient = ref(true);

      return {
        form7ActiveTab,
        form7LoginEmail,
        form7LoginPassword,
        form7LoginCheck,
        form7RegisterName,
        form7RegisterUsername,
        form7RegisterEmail,
        form7RegisterPassword,
        form7RegisterPasswordRepeat,
        isClient
      };
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
            .post('api/auth/login', {
                email: this.form7LoginEmail,
                password: this.form7LoginPassword,
            })
            .then((response) => {
            
                console.log("login: ");
                console.log(response.data);
                console.log('token', response.data.data.token);

                localStorage.setItem('token', response.data.data.token);
                this.router.push('/products');

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