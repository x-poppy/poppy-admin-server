import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn } from '@augejs/typeorm';

export enum ResourceStatus {
  DISABLED = 'disabled',
  NORMAL = 'normal',
}

export enum ResourceType {
  MENU = 'menu',
  HEAD_LINK = 'headLink',
  FUNCTION = 'func',
}

@Entity('pp_resource')
export class ResourceEntity {
  @PrimaryColumn({
    length: 80,
    comment: 'resource code',
  })
  resourceCode!: string;

  @Column({
    type: 'bigint',
    comment: 'appNo for org',
  })
  @Index()
  appNo!: string;

  @Column({
    type: 'smallint',
    comment: 'app level',
    default: 0,
  })
  @Index()
  appLevel = 0;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: true,
    comment: 'parent resource code',
    default: null,
  })
  @Index()
  parent: string | null = null;

  @Column({
    type: 'enum',
    enum: ResourceType,
  })
  @Index()
  type: ResourceType = ResourceType.MENU;

  @Column({
    type: 'varchar',
    length: 200,
    comment: 'icon',
    nullable: true,
  })
  icon: string | null = null;

  @Column({
    type: 'int',
    comment: 'sort priority',
  })
  priority!: number;

  @PrimaryColumn({
    type: 'varchar',
    length: 80,
  })
  label!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  desc: string | null = null;

  @Column({
    type: 'enum',
    enum: ResourceStatus,
    default: ResourceStatus.NORMAL,
  })
  @Index()
  status: ResourceStatus = ResourceStatus.NORMAL;

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;
}
