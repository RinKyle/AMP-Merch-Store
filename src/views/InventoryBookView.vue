<template>
  <div class="p-4">
    <Card>
      <h2>Merch Inventory</h2>
      <Form :model="form" :label-width="90">
        <FormItem label="Merch Type">
          <Input v-model="form.name" />
        </FormItem>
        <FormItem label="Brand">
          <Input v-model="form.brand" />
        </FormItem>
        <FormItem label="Description">
          <Input v-model="form.description" />
        </FormItem>
        <FormItem label="Price">
          <Input v-model="form.price" type="number" />
        </FormItem>
        <FormItem label="Stock">
          <Input v-model="form.quantity" type="number" />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="saveProduct">{{ form.id ? 'Update' : 'Add' }}</Button>
          <Button @click="resetForm" style="margin-left: 8px;">Reset</Button>
        </FormItem>
      </Form>
    </Card>

    <Divider />

    <Table :columns="columns" :data="products" border>
      <template #action="{ row }">
        <Button size="small" type="info" @click="editProduct(row)">Edit</Button>
        <Button size="small" type="error" @click="deleteProduct(row.id)" style="margin-left: 8px;">Delete</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import { supabase } from '@/lib/supabase'

export default {
  name: 'productInventory',
  data() {
    return {
      form: {
        id: null,
        name: '',
        brand: '',
        quantity: '',
        description: '',
        price: 0,
      },
      products: [],
      columns: [
        { title: 'Merch Type', key: 'name' },
        { title: 'Brand', key: 'brand' },
        { title: 'Description', key: 'description' },
        { title: 'Price', key: 'price' },
        { title: 'Stock', key: 'quantity' },
        //{ title: 'Total', key: 'quantity'},
        {
          title: 'Action',
          slot: 'action',
          width: 180,
          align: 'center'
        }
      ]
    }
  },
  mounted() {
    this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      const { data, error } = await supabase.from('product').select('*')
      console.log({ data, error });
      if (!error) this.products = data
    },
    async saveProduct() {
      if (this.form.id) {
        const { error } = await supabase.from('product').update(this.form).eq('id', this.form.id)
        console.log({ error });
        if (!error) {
          this.$Message.success('product updated successfully')
          this.fetchProducts()
          this.resetForm()
        }
      } else {
        const form = { ...this.form }
        delete form.id
        const { error } = await supabase.from('product').insert([form])
        console.log({ error });

        if (!error) {
          this.$Message.success('product added successfully')
          this.fetchProducts()
          this.resetForm()
        }
      }
    },
    editProduct(product) {
      console.log(product)
      this.form = { ...product }
      delete this.form._index
      delete this.form._rowKey
    },
    async deleteProduct(id) {
      const { error } = await supabase.from('product').delete().eq('id', id)
      if (!error) {
        this.$Message.success('product deleted successfully')
        this.fetchProducts()
      }
    },
    resetForm() {
      this.form = {
        id: null,
        name: '',
        brand: '',
        quantity: '',
        description: '',
        price: 0,
      }
    }
  }
}
</script>

<style scoped>
.p-4 {
  max-width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: LightBlue;
  /* Match previous components */
  padding: 15px;
  border-radius: 8px;
}

h2 {
  margin-bottom: 16px;
}

.ivu-btn+.ivu-btn {
  margin-left: 8px;
}
</style>