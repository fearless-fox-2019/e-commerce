<template>
  <div class="columns is-multiline">
    <div class="column is-8 is-offset-1 box">
      <div class="columns is-multiline form">
        <div class="column is-12">
          <h2>All Users</h2>
          <div class="box clearmargin" v-for="user in users" :key="user._id" style="margin-top: 1.25em">
            <div class="columns is-multiline">
               <b-table-column field="id" label="ID" width="40" numeric>
                    {{ props.row.id }}
                </b-table-column>

                <b-table-column field="first_name" label="First Name">
                    {{ props.row.first_name }}
                </b-table-column>

                <b-table-column field="last_name" label="Last Name">
                    {{ props.row.last_name }}
                </b-table-column>

                <b-table-column field="date" label="Date" centered>
                    <span class="tag is-success">
                        {{ new Date(props.row.date).toLocaleDateString() }}
                    </span>
                </b-table-column>

                <b-table-column label="Gender">
                    <b-icon pack="fas"
                        :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
                    </b-icon>
                    {{ props.row.gender }}
                </b-table-column>
              <div class="column admin-product">
                <h1>{{user.fullname}}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  created() {
    this.$store.dispatch('getAllUsers');
  },
  computed: mapState({
    users: state => state.allUsers,
  }),
};
</script>

<style computed>
label {
  text-align: start
}

.form h2  {
  font-size: 24px;
  font-weight: 600;
  text-align: start;
}

.column h4 {
  color: #363636;
  display: block;
  font-size: 1rem;
  font-weight: 600;
  text-align: start
}

.file {
  margin-top : 10px;
}

.box {
  margin-top : 10vh;
}

.form {
  padding: 5%
}

.admin-product h1, p, h3, h4 {
  text-align: start
}

.admin-product h1 {
  font-weight: 600;
  font-size: 1.25em
}

.admin-product h4 {
  font-size: 1em
}

.box.clearmargin {
  margin: 0;
}

.admin-product p {
  font-size: 0.75em
}

</style>
