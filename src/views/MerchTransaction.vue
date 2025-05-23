<template>
  <div class="transaction-wrapper">
    <Card title="Merch Sale Transaction" class="transaction-form">
      <Form ref="formRef" :model="form" :rules="rules" label-width="120">
        <FormItem>
          <Input v-model="search" placeholder="Search product..." @input="filterProducts" />
          <Table :columns="productColumns" :data="filteredProducts" @on-row-click="selectProduct" size="small" border
            height="200" :row-class-name="rowClassName" />
        </FormItem>
        <FormItem label="Product" prop="productId">
          <!--  <Input v-model="search" placeholder="Search product..." @input="filterProducts" />
          <Table
            :columns="productColumns"
            :data="filteredProducts"
            @on-row-click="selectProduct"
            size="small"
            border
            height="200"
            :row-class-name="rowClassName"
          /> -->
          <div v-if="form.productId">
            <p>{{ selectedProduct.name }}</p>
            <p>Available Quantity: {{ selectedProduct.quantity }}</p>
          </div>
        </FormItem>

        <!-- <FormItem label="Merch Name" prop="customerName">
          <Input v-model="form.customerName" placeholder="Enter merch name" />
        </FormItem> -->

        <FormItem label="Price">
          <span> {{ form.price }}</span>
        </FormItem>

        <FormItem label="Quantity" prop="quantity">
          <InputNumber v-model="form.quantity" :min="1" :max="selectedProduct.quantity" :disabled="!form.productId" />
        </FormItem>

        <FormItem label="Total">
          <b> ₱ {{ form.price * form.quantity }}</b>
        </FormItem>

        <FormItem label="Note">
          <Input v-model="form.note" type="textarea" placeholder="Optional note" />
        </FormItem>

        <FormItem>
          <Button type="primary" @click="submit">Submit</Button>
        </FormItem>
      </Form>
    </Card>

    <Card title="Transaction History" class="transaction-list">
      <Table :columns="transactionColumns" :data="transactions" border />
    </Card>
  </div>
</template>

<script>
import { supabase } from '@/lib/supabase'

export default {
  name: 'ProductTransaction',
  data() {
    return {
      form: {
        productId: null,
        customerName: '',
        note: '',
        quantity: 1,
        price: 0,
      },
      rules: {
        productId: [{ required: true, message: 'Please select a product' }],
        customerName: [{ required: true, message: 'Merch name is required', trigger: 'blur' }],
        quantity: [
          { required: true, type: 'number', min: 1, message: 'Minimum quantity is 1', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              if (value > this.selectedProduct.quantity) {
                callback(new Error('Quantity exceeds available quantity'))
              } else {
                callback()
              }
            },
            trigger: 'change',
          },
        ],
        price: [{ required: true }],
      },
      products: [],
      filteredProducts: [],
      selectedProduct: {},
      search: '',
      transactions: [],
      productColumns: [
        { title: 'Merch Type', key: 'name' },
        { title: 'Brand', key: 'brand' },
        { title: 'Description', key: 'description' },
        { title: 'Price', key: 'price' },
        { title: 'Available Quantity', key: 'quantity' },
      ],
      transactionColumns: [
        // { title: 'Customer', key: 'customerName' },
        { title: 'Merch Type', key: 'name' },
        { title: 'Price', key: 'price' },
        { title: 'Quantity', key: 'quantity' },
        {
          title: 'Total',
          render: (h, { row }) => h('span', row.quantity * row.price),
        },
        { title: 'Note', key: 'note' },
      ],
    }
  },
  methods: {
    async fetchProducts() {
      const { data, error } = await supabase.from('product').select('*').gte('quantity', 1)
      if (!error) {
        this.products = data
        this.filteredProducts = data
      } else {
        this.$Message.error('Failed to fetch products')
      }
    },
    async fetchTransactions() {
      const { data, error } = await supabase
        .from('transaction')
        .select(`*, product(name)`)
        .order('id', { ascending: false })
        .limit(20)

      if (!error) {
        this.transactions = data.map(txn => ({
          ...txn,
          name: txn.product?.name || '',
        }));
      }
    },
    filterProducts() {
      const keyword = this.search.toLowerCase()
      this.filteredProducts = this.products.filter(
        product => product.name.toLowerCase().includes(keyword)
      )
    },
    selectProduct(row) {
      if (row.quantity <= 0) {
        this.$Message.warning('This product is out of quantity')
        return
      }
      this.form.productId = row.id
      this.form.price = row.price
      this.form.quantity = 1
      this.selectedProduct = row
    },
    rowClassName(row) {
      return row.quantity <= 0 ? 'row-disabled' : ''
    },
    async submit() {
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          if (this.form.quantity > this.selectedProduct.quantity) {
            this.$Message.error('Not enough quantity for this product')
            return
          }

          const { error: insertError } = await supabase.from('transaction').insert([{
            productId: this.form.productId,
            customerName: this.form.customerName,
            note: this.form.note,
            quantity: this.form.quantity,
            price: this.form.price,
          }])

          if (insertError) {
            this.$Message.error('Failed to save transaction')
            return
          }

          // update product quantity
          const newQty = this.selectedProduct.quantity - this.form.quantity
          const { error: updateError } = await supabase
            .from('product')
            .update({ quantity: newQty })
            .eq('id', this.form.productId)

          if (updateError) {
            this.$Message.error('Saved transaction, but failed to update product quantity')
          }

          this.$Message.success('Transaction completed!')
          this.resetForm()
          this.fetchProducts()
          this.fetchTransactions()
        }
      })
    },
    resetForm() {
      this.form = {
        productId: null,
        customerName: '',
        note: '',
        quantity: 1,
        price: 0,
      }
      this.selectedProduct = {}
      this.search = ''
    },
  },
  mounted() {
    this.fetchProducts()
    this.fetchTransactions()
  },
}
</script>

<style scoped>
.transaction-wrapper {
  max-width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: LightBlue;
  background-image: url('/images/Siege.jpg');
  background-size: cover;
  /* Ensures the image covers the entire container */
  background-position: center;
  /* Keeps the image centered */
  /* background-repeat: no-repeat; */
  /* ← Light gray-blue background */
  padding: 15px;
  /* Optional: add padding to separate content from edges */
  border-radius: 8px;
  /* Optional: rounded corners */
}


.transaction-form {
  padding: 20px;
}

.row-disabled {
  background-color: Black;
  color: Black;
  pointer-events: none;
}
</style>