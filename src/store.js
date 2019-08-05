import Vue from 'vue'
import Vuex from 'vuex'
import db from './firebase';
import router from './router';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tareas: [],
        tarea: { nombre: '', id: '' }
    },
    mutations: {
        //aqui vamos a llenar el array de tareas
        setTareas(state, tareas) {
            //entra al arreglo vacio de state y lo iguala la coleccion que esta en firebase tareas
            state.tareas = tareas
        },
        setTarea(state, tarea) {
            state.tarea = tarea
        },
        eliminarTarea(state, id) {
            state.tareas = state.tareas.filter(doc => {
                return doc.id != id
            })
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
        },
        getTarea({ commit }, id) {
            db.collection('tareas').doc(id).get()
                .then(doc => {
                    // console.log(doc.data());
                    // console.log(doc.id);
                    let tarea = doc.data();
                    tarea.id = doc.id
                    commit('setTarea', tarea)
                })
        },
        editarTarea({ commit }, tarea) {
            db.collection('tareas').doc(tarea.id).update({
                    nombre: tarea.nombre
                })
                .then(() => {
                    router.push({ name: 'inicio' })
                })
        },
        agregarTarea({ commit }, nombre) {
            db.collection('tareas').add({
                    nombre: nombre
                })
                .then(doc => {
                    console.log(doc.id);
                    router.push({ name: 'inicio' })
                })
        },
        eliminarTarea({ commit, dispatch }, id) {
            db.collection('tareas').doc(id).delete()
                .then(() => {
                    console.log('Tarea eliminada');
                    //dispatch('getTareas')
                    commit('eliminarTarea', id)
                })
        }
    }
})