import { registerDecorator, ValidationOptions } from 'class-validator';
import { EntitySchema, ObjectType } from 'typeorm';
import { UniqueConstraint } from '../constraints';

type UniqueConstraintInterface<E> = [
  ObjectType<E> | EntitySchema<E> | string,
  {
    select: string;
    where: string;
    parameters: Record<string, string>;
  },
];

export function UniqueDecorator<E>(
  property: UniqueConstraintInterface<E>,
  validationOptions?: ValidationOptions,
): any {
  return function (object: Record<string, any>, propertyName: string): any {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: property,
      options: validationOptions,
      validator: UniqueConstraint,
    });
  };
}
