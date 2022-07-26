export const queries = {
    getAllProducts: 'select * from Products',
    addNewProduct: 'insert into Products (name, description, quantity) values (@name, @description, @quantity)',
    getProduct: 'select * from Products where id = @id',
    deleteProduct: 'delete from Products where id = @id',
    getTotalProduct: 'select Count(*) from Products',
    updateProduct: 'update Products set Name = @name, Description = @description, Quantity = @quantity where id = @id'
}