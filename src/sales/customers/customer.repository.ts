import { Repository, EntityRepository } from 'typeorm';
import { Customer, CustomerStatus } from './customer.entity';
import { CreateCustomerDto } from './create-customer.dto';
import { User } from '../../auth/user.entity';
import moment = require('moment');

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  // CREATE CUSTOMER LOGIC
  async createCustomer(
    createCustomerDto: CreateCustomerDto,
    user: User,
  ): Promise<Customer> {
    // destruct createCustomerDto
    const { name, email, phoneNo, tin, lastPassword } = createCustomerDto;
    // instantiate a new customer
    const customer = new Customer();
    // assign it the new details provided.
    customer.name = name;
    customer.email = email;
    customer.status = CustomerStatus.ACTIVE;
    customer.tin = tin;
    customer.phoneNo = phoneNo;
    customer.lastPassword = lastPassword;
    customer.createdBy = user.id;
    customer.createDt = moment().format('YYYY/MM/DD');

    // save the new customer to database
    await customer.save();

    // remove the user info when returning customer details
    delete customer.createdBy;
    // then retun it
    return customer;
  }
  // GET CUSTOMERS
  async getCustomers(): Promise<Customer[]> {
    const customers = await this.find();
    return customers;
  }
}
