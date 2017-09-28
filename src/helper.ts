/**
 * Returns an object that has the same schema than `template`, but with
 * replaced from `patch`, if they are specified
 * @param patch A partially-filled version of template
 * @param template A full-object
 */
export function mergeObject<E extends object>(patch: Partial<E>, template: E): E {
	// We have to specify the type of `newObject` as `any`
	// because it will first be of type Partial<E>, and then
	// become a full E
	// TODO: Find a way to statically express that 
	let newObject: any = {};

	for (let propertyKey in template) {
		if (patch[propertyKey] === undefined) {
			// `patch` doesn't provide a value for this property,
			// take the one from `template`
			newObject[propertyKey] = template[propertyKey];
		} else {
			let templateValue = template[propertyKey];
			let patchValue = patch[propertyKey];

			// We check if the type matches
			if (template[propertyKey] != null && patchValue != null && typeof(template[propertyKey]) != typeof(patchValue)) {
				throw new Error(`Wrong type for "${propertyKey}", should be "${typeof(templateValue)}", but is "${typeof(patchValue)}"`);
			}

			if (templateValue == null) {
				newObject[propertyKey] = patchValue;
			} else if (typeof(templateValue) == "object" && !Array.isArray(templateValue)) {
				newObject[propertyKey] = mergeObject(patchValue, templateValue);
			} else {
				// TODO: handle list in a better way
				newObject[propertyKey] = patchValue;
			}
		}
	}

	return newObject;
}