import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'

@Entity()
export class Execution extends BaseEntity {
  @PrimaryGeneratedColumn()
  executionID: number

  @Column()
  sequenceID: string

  @Column()
  stepID: string

  @Column()
  started: Date

  @Column()
  finished?: Date

  @Column()
  result?: string
}
