<template>
  <div class="dashboard-wrapper">
    <Card title="Monthly Sales" class="dashboard-metrics">
      <div class="stats-grid">
        <div class="stat-card stat-sales">

          <i class="bi bi-currency-dollar icon"></i>
          <h3>Total Sales</h3>
          <p class="stat-value">₱ {{ monthlyTotalSales.toLocaleString() }}</p>
        </div>
        <div class="stat-card stat-quantity">
          <i class="bi bi-box-seam icon"></i>
          <h3>Total Quantity</h3>
          <p class="stat-value">{{ monthlyTotalQuantity }}</p>
        </div>
        <div class="stat-card stat-count">
          <i class="bi bi-receipt icon"></i>
          <h3>Transactions</h3>
          <p class="stat-value">{{ monthlyTransactionCount }}</p>
        </div>
      </div>
    </Card>

    <Card title="Latest Transactions" class="dashboard-latest">
      <Table :columns="transactionColumns" :data="latestTransactions" border stripe />
    </Card>
  </div>
</template>

<script>
import { supabase } from '@/lib/supabase'
import moment from 'moment'

export default {
  name: 'Dashboard',
  data() {
    return {
      latestTransactions: [],
      monthlyTotalSales: 0,
      monthlyTotalQuantity: 0,
      monthlyTransactionCount: 0,
      transactionColumns: [
        { title: 'Merch Type', key: 'name' },
        // { title: 'Book ID', key: 'bookId' },
        { title: 'Quantity', key: 'quantity' },
        { title: 'Price', key: 'price' },
        {
          title: 'Total',
          render: (h, { row }) => h('span', row.quantity * row.price),
        },
        {
          title: 'Date',
          render: (h, { row }) => h('span', moment(row.created_at).format('MMM DD, YYYY')),
        },
      ],
    }
  },
  methods: {
    async fetchLatestTransactions() {
      const { data, error } = await supabase
        .from('transaction')
        .select(`*, product(name)`)
        .order('created_at', { ascending: false })
        .limit(100)

      if (!error) {
        this.latestTransactions = data.map(txn => ({
          ...txn,
          name: txn.product?.name || '',
        }));
      }
    },
    async fetchMonthlyStats() {
      const startOfMonth = moment().startOf('month').format('YYYY-MM-DD')
      const endOfMonth = moment().endOf('month').format('YYYY-MM-DD')

      const { data, error } = await supabase
        .from('transaction')
        .select('quantity, price')
        .gte('created_at', startOfMonth)
        .lte('created_at', endOfMonth)

      if (!error) {
        this.monthlyTotalSales = data.reduce((acc, curr) => acc + Number(curr.price) * Number(curr.quantity), 0)
        this.monthlyTotalQuantity = data.reduce((acc, curr) => acc + Number(curr.quantity), 0)
        this.monthlyTransactionCount = data.length
      }
    },
  },
  mounted() {
    this.fetchLatestTransactions()
    this.fetchMonthlyStats()
  },
}
</script>

<style scoped>
.dashboard-wrapper {
  padding: 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.stat-card {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

/* .icon {
  font-size: 24px;
  margin-bottom: 8px;
  display: block;
} */
.icon {
  font-size: 28px;
  margin-bottom: 6px;
  display: inline-block;
}

.stat-value {
  font-size: 26px;
  font-weight: bold;
  color: #333;
}

.stat-sales {
  border-left: 4px solid #1890ff;
}

.stat-quantity {
  border-left: 4px solid #52c41a;
}

.stat-count {
  border-left: 4px solid #f5222d;
}

.dashboard-latest {
  margin-top: 32px;
}
</style>
