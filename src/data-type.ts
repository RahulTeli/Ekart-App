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
}