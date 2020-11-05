/**
 * AhwRootScopeShared service
 * This class was created for shared data between angularJS and Angular applications
 *
 * @class AhwRootScopeShared
 */
export class AhwRootScopeShared {
    static $inject = ['$rootScope', '$state'];

    constructor(public $rootScope: any, public $state: any) {
        this.$rootScope = $rootScope
        this.$state = $state
    }
}

export default ngModule => {
    ngModule.service('AhwRootScopeShared', AhwRootScopeShared)
}
