<style scoped>
.layout {
    background-image: url('/images/Siege.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    min-height: 100vh;
    color: #fff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    position: relative;
}

.layout::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: Black;
    /* Dark overlay for readability */
    z-index: 0;
}

.layout>* {
    position: relative;
    z-index: 1;
}

.layout .ivu-menu {
    background-color: Black;
    border-right: 1px solid Black;
    z-index: 2;
}

.layout-header-bar {
    background-color: Black;
    /* Background for AMP Merch Store */
    display: flex;
    align-items: center;
    height: 60px;
    box-shadow: 0 2px 5px LightBlue;
    /* Under the header */
    padding: 0 20px;
}

.layout-header-bar b {
    font-size: 20px;
    font-weight: bold;
    margin-left: 15px;
    color: White;
    /* AMP Merch Store text color */
    letter-spacing: 1px;
}

.ivu-layout-content {
    background-color: Black;
    border-radius: 8px;
    padding: 20px;
    margin: 20px;
    color: Black;
    /* Change text color for Total Sales, Total Quantity, and Transactions */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Sidebar and icon styles remain unchanged from your version */
</style>


<template>
    <div class="layout">
        <Layout style="height: 100vh;">
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu :active-name="currentRoute" theme="light" width="auto" :class="menuitemClasses">
                    <MenuItem @click="goTo('/home')" name="/home">
                    <Icon type="ios-navigate"></Icon>
                    <span>Home</span>
                    </MenuItem>
                    <MenuItem @click="goTo('/inventory-book')" name="/inventory-book">
                    <Icon type="ios-search"></Icon>
                    <span>Merch Inventory</span>
                    </MenuItem>
                    <MenuItem @click="goTo('/book-transaction')" name="/book-transaction">
                    <Icon type="ios-search"></Icon>
                    <span>Merch Transaction</span>
                    </MenuItem>
                    <!-- <MenuItem @click="goTo('/inventory')" name="/inventory">
                        <Icon type="ios-search"></Icon>
                        <span>Inventory</span>
                    </MenuItem> -->
                    <MenuItem @click="goTo('/about')" name="/about">
                    <Icon type="ios-settings"></Icon>
                    <span>About</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{ padding: 0 }" class="layout-header-bar">
                    <Icon @click="collapsedSider" :class="rotateIcon" :style="{ margin: '0 20px' }" type="md-menu"
                        size="24"></Icon>
                    <b class="gradient-text">AMP Merch Store</b>
                </Header>
                <Content :style="{ margin: '20px', background: '#fff', minHeight: '260px', overflowY: 'auto' }">
                    <RouterView></RouterView>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isCollapsed: false
        }
    },
    computed: {
        rotateIcon() {
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
            ];
        },
        menuitemClasses() {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        },

        currentRoute() {
            return this.$route.path
        }
    },
    methods: {
        collapsedSider() {
            this.$refs.side1.toggleCollapse();
        },
        goTo(path) {
            this.$router.push(path);
        }
    }
}
</script>