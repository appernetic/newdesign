/*!
* Start Bootstrap - Agency Bootstrap Theme (http://startbootstrap.com)
* Code licensed under the Apache License v2.0.
* For details, see http://www.apache.org/licenses/LICENSE-2.0.
*/
var smalldevice = false;
$(function() {
  // run test on initial page load
  checkSize();
  // run test on resize of the window
  $(window).resize(checkSize);
});

function checkSize(){
  if ($(window).width() <= 996){
    smalldevice = true;
  }
};

// floating form
$(function() {
  console.log(smalldevice);
  $("#feedback-tab").click(function() {
    $("#feedback-form").toggle("slide");
  });
  // show form after specifed timeout
  if(smalldevice == false) {
    setTimeout(function(){ $("#feedback-form").show(); }, 8000);
  };
  $("#feedback-form form").on('submit', function(event) {
    var $form = $(this);
    $.ajax({
      type: $form.attr('method'),
      url: $form.attr('action'),
      data: $form.serialize(),
      success: function() {
        $("#feedback-form").toggle("slide").find("textarea").val('');
      }
    });
    event.preventDefault();
  });
});


// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
  $('a.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    var target_pos = ($($anchor.attr('href')).length > 0) ? $($anchor.attr('href')).offset().top : 0;
    var fhdr = $('navbar');
    var fhdr_height = (fhdr.length > 0) ? fhdr.outerHeight() : 0;
    target_pos -= fhdr_height + 70;
    $('html, body').stop().animate({
      scrollTop: target_pos 
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
  target: '.navbar-fixed-top'
});

//Navbar Box Shadow on Scroll
$(function(){
  var navbar = $('.navbar');
  $(window).scroll(function(){
    if($(window).scrollTop() <= 40){
      navbar.css('box-shadow', 'none');
    } else {
      navbar.css('box-shadow', '0px 0px 25px rgba(0, 0, 0, 0.4)');
    }
  });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
  $('.navbar-toggle:visible').click();
});


/**
* Specifies a basic slider configurations.
*
* @param specifiedConfig
* @constructor
*/
var ComparisonSlider = function (specifiedConfig) {
  this.specifiedConfig = specifiedConfig || {};
};

/**
* Will contain the noUiSlider obj
* @type {null}
*/
ComparisonSlider.prototype = {

  slider: null,
  config: {
    identifier: '[data-role="comparison-slider"]',
    currency: '€',
    nrFormat: '0,0', //@see http://numeraljs.com/
    language:'de',
    //height: 455, //this is needed when the orientation is vertical
    slider: {
      start: 1000000,
      //orientation: 'vertical',
      //direction: 'rtl',
      step: 10000,
      range: {
        'min': 100000,
        'max': 1500000
      }
    },
    tooltip: {
      nrFormat: '0,0'
    }
  },

  /**
  * Acts as a constructor function
  */
  init: function () {
    this.setConfiguration();
    this.setAdditionalConfiguration();

    numeral.language(this.config.language);

    this.registerNoUiSlider();
    this.registerHandleTooltip();

    this.slider.noUiSlider.on('update', _.bind(this.onUpdate, this));
  },

  /**
  * Merges configs
  */
  setConfiguration: function () {
    this.config.identifier = this.specifiedConfig.identifier || this.config.identifier;
    this.config.currency = this.specifiedConfig.currency || this.config.currency;
    this.config.height = this.specifiedConfig.height || null;
    this.config.language = this.specifiedConfig.language || this.config.language;
    this.config.nrFormat = this.specifiedConfig.nrFormat || this.config.nrFormat;

    this.config.noUiSlider = _.merge(this.config.slider, this.specifiedConfig.slider);
    this.config.tooltip = _.merge(this.config.tooltip, this.specifiedConfig.tooltip);
  },

  /**
  * Register the noUiSlider with the provided configs
  *
  * @return bool
  */
  registerNoUiSlider: function () {
    var sliderContainer = $(this.config.identifier);

    if (this.config.height !== undefined) {
      sliderContainer.height(this.config.height);
    }

    if(sliderContainer.length <= 0){
      console.error("The identifier for the slider is not valid");
      return false;
    }

    this.slider = sliderContainer[0];
    noUiSlider.create(this.slider, this.config.slider);
    return true;
  },

  /**
  * Register the handle tooltip, and bind it to the update event.
  */
  registerHandleTooltip: function () {
    if (this.slider === null || this.slider == undefined) {
      console.error('The slider is not valid.', this.slider);
      return false;
    }

    var tipHandles = this.slider.getElementsByClassName('noUi-handle'),
    tooltip;

    tooltip = document.createElement('div');
    tipHandles[0].appendChild(tooltip);
    tooltip.className += 'tooltip hidden-sm';
    tooltip.innerHTML = '<span></span><span>&nbsp;'+ this.config.currency +'</span>';
    tooltip = tooltip.getElementsByTagName('span')[0];

    var tooltipFormat = this.config.tooltip.nrFormat || this.config.nrFormat;
    this.slider.noUiSlider.on('update', _.bind(function (values, handle) {
      tooltip.innerHTML = numeral(values[0]).format(tooltipFormat);
    }, this));
  },

  /**
  * Wrapper for data role select.
  *
  * @param role
  * @returns {*|jQuery|HTMLElement}
  */
  getFromDataRole: function (role) {
    return jQuery('[data-role="' + role + '"]');
  },


  /**
  * TO be used by child classes to set additional configurations.
  */
  setAdditionalConfiguration: function () {},

  /**
  *
  * @Note this event fires once on initialization, use it
  * in the child object to instantiate your base values.
  *
  * @param valuesArray
  * @param handle
  * @param value
  */
  onUpdate: function (valuesArray, handle, value) {}
};

/**
* Inheritor constructor class
* @param sliderConfig
* @param comparisonConfig
* @constructor
*/
function RentComparisonSlider(sliderConfig, comparisonConfig) {
  ComparisonSlider.call(this, sliderConfig);

  this.specifiedComparisonConfig = comparisonConfig || {};
}


/**
*  Class extension
* @type {Object|*}
*/
RentComparisonSlider.prototype = _.create(ComparisonSlider.prototype, {
  /**
  * Defines the dom identifiers and base values to be used for the slider.
  * All of this can be replaced in the constructor.
  */
  compConf: {
    //Identifier //data-role="comparison-competition-comision"
    id: { //actually the role would be the identifier
      competition: {
        commission: 'comparison-competition-commission',
        remainingBudget: 'comparison-competition-remaining-budget'
      },
      century21: {
        commission: 'comparison-century21-commission'
      },

      savings: 'comparison-savings'
    },

    // Improvement setDefaults from here, now we show as defaults the values from the html
    defaults: {
      century21: {
        century21Commission: {
          'lessThan1200': 490,
          'between1200And2000': 990,
          'moreThan2000': 1490
        }
      },

      competition: {
        commissionPercentage: 2.38
      }
    }
  },

  /**
  * Transport the data through the execution layer.
  */
  comparison: {
    prices: {
      competitioncommission: 0,
      competitionRemainingBudget: 0,
      century21RemainingBudget: 0,
      century21Commission: 0,
      savings: 0
    },

    dimensions: {
      bubble: {
        height: 0,
        width: 0
      }
    },

    stackDimension: {
      current: 0
    }
  },

  /**
  * Set/overide second config, values.
  * @returns {boolean}
  */
  setAdditionalConfiguration: function () {
    if (!_.isEmpty(this.specifiedComparisonConfig)) {
      this.compConf = _.merge(this.compConf, this.specifiedComparisonConfig);
    }
  },

  /**
  * When the slider is updated.
  *
  * @param valuesArray
  * @param handle
  */
  onUpdate: function (valuesArray, handle) {

    this.calculatePrices(valuesArray[0]);
    this.displayPrices();
    this.displayPricesStack(valuesArray[0]);
    this.updateMoneyHeight(valuesArray[0]);
  },

  /**
  *
  * @param selectedValue
  * @returns {SellComparisonSlider.comparison.prices|{competitioncommission, competitionRemainingBudget, century21RemainingBudget, savings}}
  */
  calculatePrices: function (selectedValue) {
    var compcommission,
    century21Commission,
    savings;

    /**
    * Competition commission value * percentage they take.
    * @type {number}
    */
    compcommission =  selectedValue * this.compConf.defaults.competition.commissionPercentage;

    if (selectedValue < 1200) {
      century21Commission = parseInt(this.compConf.defaults.century21.century21Commission.lessThan1200);

      savings = compcommission - century21Commission;
      this.comparison.prices.century21Commission = century21Commission;
    } else if (selectedValue >= 1200 && selectedValue < 2000) {
      century21Commission = parseInt(this.compConf.defaults.century21.century21Commission.between1200And2000);

      savings = compcommission - century21Commission;
      this.comparison.prices.century21Commission = century21Commission;
    } else {
      century21Commission = parseInt(this.compConf.defaults.century21.century21Commission.moreThan2000);

      savings = compcommission - century21Commission;
      this.comparison.prices.century21Commission = century21Commission;
    }

    this.comparison.prices.competitioncommission = compcommission;
    this.comparison.prices.savings = savings;

    return this.comparison.prices;
  },

  /**
  * Update the html node values.
  */
  displayPrices: function () {

    this.getFromDataRole(this.compConf.id.competition.commission).html(
      numeral(this.comparison.prices.competitioncommission).format(this.config.nrFormat)
    );

    this.getFromDataRole(this.compConf.id.century21.commission).html(
      numeral(this.comparison.prices.century21Commission).format(this.config.nrFormat)
    );

    this.getFromDataRole(this.compConf.id.savings).html(
      numeral(this.comparison.prices.savings).format(this.config.nrFormat)
    );
  },


  displayPricesStack: function () {

    this.getFromDataRole(this.compConf.id.competition.commission).html(
      numeral(this.comparison.prices.competitioncommission).format(this.config.nrFormat) + "<span class=\"currency\"> €</span>"
    );

    this.getFromDataRole(this.compConf.id.savings).html(
      numeral(this.comparison.prices.savings).format(this.config.nrFormat) + "<span class=\"currency\"> €</span>"
    );
  },

  updateMoneyHeight: function () {
    var moneyUnits = Math.round(this.comparison.prices.competitioncommission / 800);//500
    var difference = 0;
    if(moneyUnits >= this.comparison.stackDimension.current)
    {
      difference = moneyUnits - this.comparison.stackDimension.current;
      this.addMoneyStack(difference);
      this.comparison.stackDimension.current = moneyUnits;
    }
    else
    {
      difference = this.comparison.stackDimension.current - moneyUnits;
      this.removeMoneyStack(difference);
      this.comparison.stackDimension.current = moneyUnits;
    }
  },

  addMoneyStack: function(selectedValue) {
    var $traditionalMoneyStack = $('#traditional-money-stack');
    var $century21MoneyStack = $('#century21-money-stack');
    for(var i = 1; i <= selectedValue; i++)
    {
      $actualMargin = +73 * this.comparison.stackDimension.current;
      $futureMargin = i*+73;
      $margin = $actualMargin + $futureMargin - 65;

      var $img = $('<img>', { src: "https://century21.de/vermieten/img/money_black_low.png", alt: 'Century21 Spare', class: 'black-money-stack'});
      $img.css('bottom', $margin);
      $traditionalMoneyStack.append($img);
      
	  $img = $('<img>', { src: "https://century21.de/vermieten/img/money_orange_low.png", alt: 'Century21 Spare', class: 'orange-money-stack'});
	  $img.css('bottom', $margin + 10);
	  $century21MoneyStack.append($img);
		

      $('.pig-grid').css('margin-top', "-=5px" );
      $('.pig-icon').css('margin-top', "-=5px" );
    }

  },

  removeMoneyStack: function(selectedValue) {
    var $traditionalMoneyStack = $('#traditional-money-stack');
    var $century21MoneyStack = $('#century21-money-stack');
    for(var i = selectedValue; i > 0; i--)
    {
      $traditionalMoneyStack.find('img:last').remove();
      $century21MoneyStack.find('img:last').remove();

      $('.pig-grid').css('margin-top', "+=5px" );
      $('.pig-icon').css('margin-top', "+=5px" );

    }
  }
});


// initiate vermietung comparisons
if ($('.slider-container').length > 0) {

  var rentSlider = new RentComparisonSlider({
    nrFormat: '0,0',
    slider: {
      start: 700,
      orientation: 'horizontal',
      direction: 'ltr',
      step: 50,
      range: {
        'min': 400,
        'max': 4000
      }

    }
  }).init();
};
