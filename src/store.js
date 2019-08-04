import Vue from 'vue'
import Vuex from 'vuex'
import db from './firebase';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tareas: []
    },
    mutations: {
        //aqui vamos a llenar el array de tareas
        setTareas(state, tareas) {
            //entra al arreglo vacio de state y lo iguala la coleccion que esta en firebase tareas
            state.tareas = tareas
        }
    },
    actions: {
        //aqui obtendremos las tareas que vienen de la db
        getTareas({ commit }) {
            const tareas = []
            db.collection('tareas').get().then(snapchot => {
                snapchot.forEach(doc => {
                    // console.log(doc.id);
                    // console.log(doc.data());
                    let tarea = doc.data();
                    tarea.id = doc.id
                    tareas.push(tarea)
                })
            })

            commit('setTareas', tareas)
        }
    }
})