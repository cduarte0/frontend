<template>
  <div class="flex min-h-screen">
    <div class="hidden lg:block lg:w-1/2">
      <img
        src="~/assets/images/login-cover.png"
        class="h-screen object-cover"
      />
    </div>
    <div class="flex flex-wrap flex-col w-full justify-center lg:w-1/2">
      <div class="flex justify-center w-full">
        <img class="w-16" src="~/assets/images/caritas.png" alt="caritas-Logo" />
      </div>

      <div class="flex flex-wrap flex-col w-full items-center space-y-5 mt-8">
        <div class="w-1/3">

          <div v-if="message" style="align-content: center; font-family: Arial; color: red">
            {{ message }}
          </div>

          <label for="username" class="sr-only">Username</label>
          <input
            id="username"
            v-model="form.username"
            name="username"
            type="username"
            autocomplete="username"
            required
            class="
              appearance-none
              rounded-none
              relative
              block
              w-full
              px-3
              py-2
              border border-gray-300
              placeholder-gray-500
              text-gray-900
              rounded-t-md
              focus:outline-none
              focus:ring-green-500
              focus:border-green-500
              focus:z-10
              sm:text-sm
            "
            placeholder="Username"
          />
        </div>
        <div class="w-1/3">
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            v-model="form.password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            class="
              appearance-none
              rounded-none
              relative
              block
              w-full
              px-3
              py-2
              border border-gray-300
              placeholder-gray-500
              text-gray-900
              rounded-b-md
              focus:outline-none
              focus:ring-green-500
              focus:border-green-500
              focus:z-10
              sm:text-sm
            "
            placeholder="Password"
          />
        </div>
        <div class="text-sm">
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
            Esqueceu sua senha?
          </a>
        </div>
        <div class="w-1/3">
          <button
            type="submit"
            class="
              group
              relative
              w-full
              flex
              justify-center
              py-2
              px-4
              border border-transparent
              text-sm
              font-medium
              rounded-md
              text-white
              bg-green-500
              hover:bg-green-700
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-green-500
            "
            @click="login"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'Login',
  components: { },
  layout: 'blank',

  data: () => ({

    message : '',

    form: {
      username: '',
      password: '',
    },
  }),
  head: {
    title: 'Login - Caritas - Gest??o de Projectos',
  },

  methods: {
    async login() {

      if (!this.form.password && !this.form.username){
        this.message = 'Aten????o!!! Os campos n??o podem estar vazios!'
        return;
      }

      if(!this.form.password){
        this.message = 'Aten????o!!! O campo Password n??o pode estar vazio!'
        return;
      }

      if(!this.form.username) {
        this.message = 'Aten????o!!! O campo Username n??o pode estar vazio!'
        return;
      }

      await (this as any).$auth
        .loginWith('local', { data: this.form })
        .then(() => {
          (this as any).$auth.redirect('home', true)
        })
        .catch((e: any) => {
          if (this.form.password && this.form.username){
            this.message = 'Username ou Password, invalido ou falha na conexao! Por favor, tente novamente.'
          }

          // console.log(e)
        })
    },
  },
})
</script>
