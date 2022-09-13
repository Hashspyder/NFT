export type StringKeys = {[key: string]: any};

/**
 * Converts a struct output to key: value mode
 * @author Farbod Shams<farbodshams.2000@gmail.com>
 * @param struct
 */

function convert(struct: StringKeys): StringKeys {
    let finalizedObject: StringKeys = {};
    const keys = Object.keys(struct);
    const stringKeys = keys.slice(keys.length / 2);

    for(const key of stringKeys) {
        if(key)
            finalizedObject[key] = struct[key];
    }
    return finalizedObject;

}

function structToObject(struct: StringKeys | StringKeys[], isArray: boolean = false): typeof struct {
    if(isArray && Array.isArray(struct)) {
        return struct.map(item => convert(item));
    }
    return convert(struct);
}

export default structToObject;