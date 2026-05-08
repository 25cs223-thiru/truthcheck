import List "mo:core/List";
import Types "types/common";
import DetectionMixin "mixins/detection-api";

actor {
  let submissions = List.empty<Types.Submission>();

  include DetectionMixin(submissions);
};
