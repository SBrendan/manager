export default /* @ngInject */ ($stateProvider, coreConfigProvider) => {
  $stateProvider.state('pci.projects.project.failover-ips.onboarding.order', {
    url: '/order',
    layout: 'modal',
    views: {
      modal: {
        component: 'pciProjectFailoverIpsOrderOrder',
      },
    },
    resolve: {
      breadcrumb: /* @ngInject */ () => null,
      /* @ngInject */
      products: (availableRegionsForOrder, OvhApiOrderCatalogFormatted) =>
        OvhApiOrderCatalogFormatted.v6()
          .get({
            catalogName: 'ip',
            ovhSubsidiary: coreConfigProvider.getUser().ovhSubsidiary,
          })
          .$promise.then(({ plans }) =>
            plans.filter(
              (offer) =>
                /failover/.test(offer.planCode) &&
                availableRegionsForOrder.some((region) =>
                  offer.invoiceName.includes(region.region),
                ),
            ),
          ),

      goBack: /* @ngInject */ (goToFailoverIpsOnboarding) =>
        goToFailoverIpsOnboarding,
    },
  });
};
