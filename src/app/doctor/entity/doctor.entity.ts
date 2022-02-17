import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'doctors' })
export class DoctorEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ width: 120 })
    nome: string;

    @Column({ width: 7})
    crm: number;

    @Column({type: 'int'})
    telfixo: number;

    @Column({type: 'int', width: 12})
    telcelular: number;

    @Column({type: 'int'})
    cep: number;

    @Column()
    especialidade: string;

    @CreateDateColumn({ name: 'create_at' })
    createdAt: string;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt: string;

    @DeleteDateColumn({ name: 'delete_at' })
    deletedAt: string;
}