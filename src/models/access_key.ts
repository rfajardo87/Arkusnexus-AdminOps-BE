import { DataTypes,Model } from "sequelize";
import sequelize from "../sqlz/source";
import useBcrypt from "sequelize-bcrypt";

export class AccessKey extends Model {
    declare usuario_id: number;
    declare password: string;
}

AccessKey.init({
    usuario_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    password: DataTypes.STRING,
}, {
    sequelize,
    tableName: "access_key",
});

useBcrypt(AccessKey);

export default AccessKey;
