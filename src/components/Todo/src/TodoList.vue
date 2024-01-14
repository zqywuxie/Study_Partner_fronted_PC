<template>
  <div style="width: 416px">
    <div class="header">
      <el-input
          v-model="input"
          placeholder="Input something"
          style="width: 318px"
          size="small"
          ref="todoRef"
      />
      <el-button
          type="primary"
          @click="addToDo"
          :disabled="input ? false : true"
      >添加
      </el-button
      >
    </div>

    <div class="to_do_list">
      <div class="delete-batch">
        <el-checkbox @click="checkAll" v-model="checkAllFlag"
        >全选 {{ checkedToDo.length }} / {{ todoListArr.length }}
        </el-checkbox
        >
        <el-button
            type="danger"
            :disabled="checkedToDo.length ? false : true"
            @click="deleteBatch"
        >批量删除
        </el-button
        >
      </div>
      <el-checkbox-group v-model="checkedToDo">
        <div
            class="to_do_list_item"
            v-for="(item, index) in todoListArr"
            :key="index"
        >
          <el-checkbox :label="item.name"
          ><span v-if="!item.flag">{{ item.name }}</span
          >
            <el-input
                size="small"
                v-else
                ref="refInput"
                v-model="item.name"
                :autofocus="true"
                @blur="inputBlur(item, $event)"
            ></el-input>
            <!--todo 加个时间-->
          </el-checkbox>
          <div>
            <el-button
                type="primary"
                size="small"
                style="margin: 3px"
                @click="updateToDo(item, $event)"
            >
              {{ item.flag ? "完成" : "修改" }}
            </el-button>

            <el-button
                type="danger"
                size="small"
                style="margin: 3px"
                @click="deleteToDo(item)"
            >删除
            </el-button
            >
          </div>
        </div>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, nextTick} from "vue"
import {storeToRefs} from "pinia"
import ToDoList from "../../../store/modules/todoList"
import {ElMessage, ElMessageBox} from "element-plus"

const todoListStore = ToDoList()
const {todoListArr} = storeToRefs(todoListStore)
const checkedToDo = ref([])
const checkAllFlag = ref(false)
const todoRef = ref()
let input = ref("")
const refInput = ref()

const addToDo = () => {
  todoListStore.addToDo({name: input.value, flag: false})
  input.value = ""
}

const checkAll = () => {
  if (checkAllFlag.value) checkedToDo.value = []
  else {
    checkedToDo.value = todoListArr.value.map((item) => item.name)
  }
}
const updateToDo = async (item, e) => {
  console.log(item.flag)
  if (!item.flag) {
    item.flag = true
    await nextTick()
    refInput.value[0].focus()
  } else {
    // 数据库修改
  }

}
const deleteToDo = async (item) => {
  await deleteWarning("是否删除该 ToDo")
  todoListStore.deleteToDo(item)
  ElMessage({
    message: "删除成功！",
    type: "success",
  })
}
const inputBlur = (item, e) => {
  item.flag = false
}
const deleteBatch = async () => {
  await deleteWarning("是否批量删除 ToDo")
  todoListStore.deleteToDoBatch(checkedToDo)
  ElMessage({
    message: "删除成功！",
    type: "success",
  })
}
const deleteWarning = (info) => {
  return ElMessageBox.confirm(info, "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
}
</script>

<style scoped>
.to_do_list {
  border: 1px solid #ccc;
  width: 416px;
  border-radius: 4px;
  margin-top: 8px;

  .to_do_list_item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 8px;
    padding: 8px 0;
    border-bottom: 1px solid rgb(242, 241, 241);

    &:last-child {
      border: 0;
    }
  }

  .delete-batch {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 8px;
    border-bottom: 1px solid rgb(219, 214, 214);
  }
}
</style>