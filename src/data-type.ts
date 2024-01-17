export interface SignupSeller{
    Name:string,
    Password:string,
    Email:string
}
export interface LoginSeller{
    Email:string,
    Password:string
}
export interface SignupUser{
    Name:string,
    Password:string,
    Email:string
}
export interface LoginUser{
    Email:string,
    Password:string
}

export interface Product{
    productname:string,
    productprice:number,
    productcolor:string,
    productcategory:string,
    productimage:string,
    productdescription:string,
    id:number,
    quantity:number
    productid:undefined|number
}

export interface Cart{
    productname:string,
    productprice:number,
    productcolor:string,
    productcategory:string,
    productimage:string,
    productdescription:string,
    id:number | undefined,
    quantity:number,
    productid :number,
    userid:number
}

export interface Summary{
    price:number,
    total:number,
    discount:number,
    delievery:number,
    tax:number
}

export interface Order{
    name:string,
    email:string,
    address:string,
    mobille:number,
    payment:string,
    amount:number,
    userid:number,
    id:number|undefined
}