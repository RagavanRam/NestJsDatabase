import { Inject } from '@nestjs/common';
import { each, at } from 'lodash';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
  ValidationArguments,
} from 'class-validator';
import { ValidatorsService } from '../services';

@ValidatorConstraint({ name: 'unique', async: true })
export class UniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject(ValidatorsService) private validatorsService: ValidatorsService,
    @InjectEntityManager() private entityManager: EntityManager,
  ) {}

  async validate(value: any, validationArguments?: ValidationArguments) {
    const [entityClass, queryConditions] = validationArguments.constraints;
    const parameters = { value, params: this.validatorsService.getParams() };
    const queryBuilder = this.entityManager
      .getRepository(entityClass)
      .createQueryBuilder();
    queryBuilder.select(queryConditions.select).where(queryConditions.where);
    const parameterQuery = {};
    each(queryConditions.parameters, (val: any, property: any) => {
      const find = at(parameters, val);
      parameterQuery[property] = find[0];
    });
    const entity = await queryBuilder.setParameters(parameterQuery).getOne();
    return !entity;
  }
}
