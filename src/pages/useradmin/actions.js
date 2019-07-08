let nextTodoId = 0;
export const AddRowData = ({ username, phone, email, key }) => ({
  type: 'Add_RowData',
  username,
  phone,
  email,
  key: nextTodoId++
});
export const DeleteRowData = ({ username, phone, email, key, i }) => ({
  type: 'Delete_RowData',
  i,
  key: nextTodoId++
});
export const UpdateRowData = ({ username, phone, email, key, i }) => ({
  type: 'Update_RowData',
  username,
  phone,
  email,
  key: nextTodoId++,
  i
});
