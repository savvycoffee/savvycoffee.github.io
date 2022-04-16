    $(function() {
        var menu = $(".autocomplete-menu");
        var input = $("#address_1");
      
        function getSuggestions(search, selected) {
            $.ajax({
                url: "https://us-autocomplete-pro.api.smartystreets.com/lookup?",
                data: {
                    "auth-id": '118834766777191369',
                    "search": search,
                    "selected": (selected ? selected : "")
                    },
                dataType: "jsonp",
                success: function(data) {
                    if (data.suggestions) {
                        buildMenu(data.suggestions);
                    } else {
                        noSuggestions();
                    }
                },
                error: function(error) {
                    return error;
                }
            });
        }
      
        function getSingleAddressData(address) {
            $.ajax({
                url: "https://us-street.api.smartystreets.com/street-address?",
                data: {
                    "auth-id": '118834766777191369',
                    "street": address[0],
                    "city": address[1],
                    "state": address[2]
                },
                dataType: "jsonp",
                success: function(data) {
                    $("#zip").val(data[0].components.zipcode);
                },
            error: function(error) {
                return error;
                }
            });
        }
      
        function clearAddressData() {
            $("#city").val("");
            $("#state").val("");
            $("#zip").val("");
        }
      
        function noSuggestions() {
          menu.empty();
          menu.append("<li class='ui-state-disabled'><div>No Suggestions Found</div></li>");
          menu.menu("refresh");
        }
      
        function buildAddress(suggestion) {
          var whiteSpace = "";
          if (suggestion.secondary || suggestion.entries > 1) {
            if (suggestion.entries > 1) {
              suggestion.secondary += " (" + suggestion.entries + " more entries)";
            }
            whiteSpace = " ";
          }
          var address = suggestion.street_line + whiteSpace + suggestion.secondary + " " + suggestion.city + ", " + suggestion.state + " " + suggestion.zipcode;
          var inputAddress = $("#address_1").val();
          for (var i = 0; i < address.length; i++) {
            var theLettersMatch = typeof inputAddress[i] == "undefined" || address[i].toLowerCase() !== inputAddress[i].toLowerCase();
            if (theLettersMatch) {
              address = [address.slice(0, i), "<b>", address.slice(i)].join("");
              break;
            }
          }
          return address;
        }
      
        function buildMenu(suggestions) {
          menu.empty();
          suggestions.map(function(suggestion) {
            var caret = (suggestion.entries > 1 ? "<span class=\"ui-menu-icon ui-icon ui-icon-caret-1-e\"></span>" : "");
            menu.append("<li><div data-address='" +
              suggestion.street_line + (suggestion.secondary ? " " + suggestion.secondary : "") + ";" +
              suggestion.city + ";" +
              suggestion.state + "'>" +
              caret +
              buildAddress(suggestion) + "</b></div></li>");
          });
          menu.menu("refresh");
        }
      
        $(".autocomplete-menu").menu({
          select: function(event, ui) {
            var text = ui.item[0].innerText;
            var address = ui.item[0].childNodes[0].dataset.address.split(";");
            var searchForMoreEntriesText = new RegExp(/(?:\ more\ entries\))/);
            input.val(address[0]);
            $("#city").val(address[1]);
            $("#state").val(address[2]);
      
            if (text.search(searchForMoreEntriesText) == "-1") {
              $(".autocomplete-menu").hide();
              getSingleAddressData(address);
            } else {
              $("#address_1").val(address[0] + " ");
              var selected = text.replace(" more entries", "");
              selected = selected.replace(",", "");
              getSuggestions(address[0], selected);
            }
          }
        });
      
        $("#address_1").keyup(function(event) {
          if (input.val().length > 0 || input.val() === "") clearAddressData();
          if (event.key === "ArrowDown") {
            menu.focus();
            menu.menu("focus", null, menu.menu().find(".ui-menu-item"));
          } else {
            var textInput = input.val();
            if (textInput) {
              menu.show();
              getSuggestions(textInput);
            } else {
              menu.hide();
            }
          }
        });
      
        $(".autocomplete-menu").css("width", ($("#address_1").width() + 24) + "px")
      
      });