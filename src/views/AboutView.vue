<template>
  <div>
    <Card title="User Management" style="margin: 20px">
      <Button type="primary" icon="md-add" @click="showAddModal">Add User</Button>
      <Table :columns="columns" :data="users" style="margin-top: 20px" border />

      <Modal v-model="modalVisible" :title="isEdit ? 'Edit User' : 'Add User'" @on-ok="handleSave">
        <Form :model="form" :label-width="80">
          <FormItem label="Name">
            <Input v-model="form.name" />
          </FormItem>
          <FormItem label="Email">
            <Input v-model="form.email" />
          </FormItem>
        </Form>
      </Modal>
    </Card>
  </div>
</template>

<script>
export default {
  name: "UserCrud",
  data() {
    return {
      users: [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" },
      ],
      modalVisible: false,
      isEdit: false,
      form: {
        id: null,
        name: "",
        email: "",
      },
      columns: [
        { title: "ID", key: "id", width: 80 },
        { title: "Name", key: "name" },
        { title: "Email", key: "email" },
        {
          title: "Actions",
          key: "actions",
          width: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: { type: "text", size: "small" },
                  on: {
                    click: () => this.showEditModal(params.row),
                  },
                },
                "Edit"
              ),
              h(
                "Button",
                {
                  props: { type: "text", size: "small" },
                  style: { marginLeft: "10px", color: "red" },
                  on: {
                    click: () => this.deleteUser(params.row.id),
                  },
                },
                "Delete"
              ),
            ]);
          },
        },
      ],
    };
  },
  methods: {
    showAddModal() {
      this.resetForm();
      this.isEdit = false;
      this.modalVisible = true;
    },
    showEditModal(user) {
      this.form = { ...user };
      this.isEdit = true;
      this.modalVisible = true;
    },
    handleSave() {
      if (this.isEdit) {
        const index = this.users.findIndex((u) => u.id === this.form.id);
        if (index !== -1) {
          this.users.splice(index, 1, { ...this.form });
        }
      } else {
        const newId = this.users.length ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
        this.users.push({ ...this.form, id: newId });
      }
      this.modalVisible = false;
    },
    deleteUser(id) {
      this.$Modal.confirm({
        title: "Confirm Deletion",
        content: "Are you sure you want to delete this user?",
        onOk: () => {
          this.users = this.users.filter((user) => user.id !== id);
        },
      });
    },
    resetForm() {
      this.form = {
        id: null,
        name: "",
        email: "",
      };
    },
  },
};
</script>

<style scoped>
</style>
