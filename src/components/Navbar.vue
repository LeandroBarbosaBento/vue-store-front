<template>
  <MDBNavbar expand="lg" light bg="light" container>
    <MDBNavbarBrand href="/">Store | </MDBNavbarBrand>
    <MDBNavbarToggler
      @click="collapse1 = !collapse1"
      target="#navbarSupportedContent"
    ></MDBNavbarToggler>
    <MDBCollapse v-model="collapse1" id="navbarSupportedContent">
      <MDBNavbarNav class="mb-2 mb-lg-0">
        <MDBNavbarItem to="Products" active>
          Produtos
        </MDBNavbarItem>
        <MDBNavbarItem to="Orders" active>
          Meus pedidos
        </MDBNavbarItem>
        <MDBNavbarItem>

          <!-- Navbar dropdown -->
          <MDBDropdown class="nav-item" v-model="dropdown1">
            <MDBDropdownToggle
              tag="a"
              class="nav-link"
              @click="dropdown1 = !dropdown1"
              >Categorias</MDBDropdownToggle
            >
            
            <MDBDropdownMenu aria-labelledby="dropdownMenuButton">
              <MDBDropdownItem href="#">Action</MDBDropdownItem>
              <MDBDropdownItem href="#">Another Action</MDBDropdownItem>
            </MDBDropdownMenu>

          </MDBDropdown>

        </MDBNavbarItem>
        <MDBNavbarItem to="#" disabled>
          Disabled
        </MDBNavbarItem>
      </MDBNavbarNav>
    </MDBCollapse>
    <MDBNavbarNav>
        <!-- Badge -->
        <MDBNavbarItem href="#">
            <span class="badge badge-pill bg-danger">1</span>
            <span><MDBIcon icon="shopping-cart"></MDBIcon></span>
        </MDBNavbarItem>

        <MDBNavbarItem href="#">
            <MDBBtn outline="danger" class="me-2"> Logout </MDBBtn>
        </MDBNavbarItem>

    </MDBNavbarNav>
  </MDBNavbar>
</template>

<script>
  import {
    
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBIcon,
    MDBBtn
  } from 'mdb-vue-ui-kit';
  import { ref } from 'vue';
  export default {
    components: {
      MDBNavbar,
      MDBNavbarToggler,
      MDBNavbarBrand,
      MDBNavbarNav,
      MDBNavbarItem,
      MDBCollapse,
      MDBDropdown,
      MDBDropdownToggle,
      MDBDropdownMenu,
      MDBDropdownItem,
      MDBIcon,
      MDBBtn
    },
    setup() {
      const collapse1 = ref(false);
      const dropdown1 = ref(false);
      return {
        collapse1,
        dropdown1
      }
    }
  };
</script>