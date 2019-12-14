import { PipeTransform, BadRequestException } from '@nestjs/common';
import { InvoiceStatus } from '../InvoiceStatusEnum';

export class InvoiceStatusValidationPipe implements PipeTransform {
  // define a readonly method to get the defined statuses
  readonly allowedStatuses = [
    InvoiceStatus.CREATED,
    InvoiceStatus.CANCELLED,
    InvoiceStatus.DELETED,
    InvoiceStatus.HELD,
    InvoiceStatus.PAID,
    InvoiceStatus.PARTIALLY_PAID,
  ];
  transform(value: any) {
    // convert value to UPPERCASE
    value = value.toUpperCase();
    // check if status value is not valid and thow Bad request error
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not a valid invoice status`);
    }
    // if all is well return status value

    return value;
  }

  isStatusValid(status: any) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
