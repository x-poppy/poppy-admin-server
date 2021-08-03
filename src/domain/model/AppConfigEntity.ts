import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn } from '@augejs/typeorm';

export enum AppConfigStatus {
  DISABLED = 'disabled',
  NORMAL = 'normal',
}

export enum AppConfigUIType {
  TEXT = 'text',
}

@Entity('pp_app_config')
export class AppConfigEntity {
  @PrimaryColumn({
    length: 80,
    comment: 'key name',
  })
  key!: string;

  @PrimaryColumn({
    type: 'bigint',
    comment: 'appNo null means common app',
  })
  @Index()
  appNo!: string;

  @Column({
    length: 80,
    comment: 'display name',
  })
  displayName!: string;

  @Column({
    type: 'enum',
    enum: AppConfigUIType,
    default: AppConfigUIType.TEXT,
    comment: 'ui name',
  })
  uiType: AppConfigUIType = AppConfigUIType.TEXT;

  @Column({
    type: 'text',
    nullable: true,
  })
  desc: string | null = null;

  @Column({
    type: 'enum',
    enum: AppConfigStatus,
    default: AppConfigStatus.NORMAL,
  })
  @Index()
  status!: AppConfigStatus;

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;
}