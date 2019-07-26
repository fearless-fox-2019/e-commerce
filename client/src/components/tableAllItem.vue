<template>
        <div class="row">
            <div id= "table-allitem" class="col-10 offset-1">
                <table>
                    <thead class="thead-light">
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Featured Image</th>
                            <th scope="col">Category</th>
                            <th scope="col">Price</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>
                    <tbody id="table-body">
                        <tr v-for="(cake, index) in allCakes" :key="cake._id">
                            <th scope="row">{{index+1}}</th>
                            <td>{{cake.name}}</td>
                            <td><img :src="cake.image" alt="Image Product" style="width: 80px; height:70px;"></td>
                            <td>{{cake .category}}</td>
                            <td>{{cake.price}}</td>
                            <td>{{cake.stock}}</td>
                            <td>
                                <button type="button" class="btn">
                                    <a @click="editItem(cake)">
                                        <i class="fas fa-edit" style="font-size: 18px"></i>
                                    </a>
                                </button>
                                <button type="button" class="btn">
                                    <a @click="removeItem(cake._id, cake.name)">
                                        <i class="fas fa-trash-alt" style="font-size: 18px"></i>
                                    </a>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

    
</template>

<script>
import axios from '@/api/api.js'
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
    name: 'tableAllItem',
    methods:{
        ...mapActions(['getAllCake']),
        ...mapMutations(['Set_currentItem']),

        editItem(item){
            this.Set_currentItem(item)

            this.$router.push('/item/edit')
        },
        removeItem(id, name){
            Swal.fire({
                title: `Are you sure to delete ${name}?`,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
                })
            .then((result) => {
                if (result.value) {
                    axios({
                        method: "delete",
                        url: `/items/${id}`,
                        headers:{
                            'token': localStorage.token
                        }
                    })
                    .then(({data}) =>{
                        Swal.fire({
                            position: 'center',
                            type: 'success',
                            title: `${name} have been deleted!`,
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.getAllCake()
                    })
                    .catch(err =>{
                        console.log('error delete product')
                        console.log(err)
                    })
                }
            })
        }
    },
    computed:{
        ...mapState(['allCakes'])
    },
    created(){
        this.getAllCake()
    }
}
</script>

<style scoped>
     #table-allitem{
        width: 100%;
        height: 600px;
        overflow: scroll;
    }
</style>
