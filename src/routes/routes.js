import Adivina from '../components/Adivina.vue'
import Pokedex from '../components/Pokedex.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', component: Pokedex},
    { path: '/adivinaPokemon', component: Adivina}
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})